'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useChampionshipStore } from '@repo/store';
import type { ModelResponse, Dimension } from '@repo/types';

import { Card } from "@repo/ui/card";
import { Icon } from '@repo/ui/icon';


interface BattleModalProps {
  isOpen: boolean;
  responses: ModelResponse[];
  onComplete: (dimension: Dimension | null) => void;
  onClose: () => void;
}

export function BattleModal({ isOpen, onComplete, onClose }: BattleModalProps) {
  const [fighter, setFighter] = useState<ModelResponse | null>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const {
    round,
    battleWinner,
    nextBattle,
    resetRound
  } = useChampionshipStore();

  useEffect(() => {
    setRoot(document.getElementById('modal-root'));
  }, []);


  if (!root) return null;

  const handleClick = (response: ModelResponse) => {
    if (!fighter || fighter.id !== response.id) {
      setFighter(response);
      return;
    }

    battleWinner(response.modelName);
    setFighter(null);
    const next = nextBattle();

    if (!next) {
      onComplete(round?.dimension ?? null);
    }
  };

  const handleClose = () => {
    setFighter(null);
    resetRound();
    onClose();
  }

  if (!isOpen || !round) return null;

  const match = round.matches[round.currentMatch];

  if (!match) return null;

  const { responseA, responseB } = match;

  return createPortal(
      <article className="fixed inset-0 flex items-center justify-center z-90">
        <div className='absolute bg-black/80 w-full h-full' onClick={handleClose} />

        <button 
          className={`
            w-100 max-w-full aspect-square absolute cursor-pointer
            -translate-y-1/2 md:-translate-x-1/2 md:-translate-y-5
            mr-0 mb-2 md:mb-0 md:mr-4
            transition-all duration-200
            ${fighter?.id === responseA.id ? 'ring-4 ring-orange-400 scale-105 rotate-6 z-10' : 'hover:scale-101'}
          `}
          onClick={() => handleClick(responseA)}
        >
          <Card className='h-full overflow-y-auto flex justify-center items-center' variant="combat">
            <p className="text-gray-300 leading-relaxed">
              {responseA.text}
            </p>
          </Card>
        </button>
        <button 
          className={`
            w-100 max-w-full aspect-square absolute cursor-pointer
            translate-y-1/2 md:translate-x-1/2 md:translate-y-5
            ml-0 mt-2 md:mt-0 md:ml-4
            transition-all duration-200
            ${fighter?.id === responseB.id ? 'ring-4 ring-orange-400 scale-105 -rotate-6 z-10' : 'hover:scale-101'}
          `}
          onClick={() => handleClick(responseB)}
        >
          <Card className='h-full overflow-y-auto flex justify-center items-center' variant="combat">
            <p className="text-gray-300 leading-relaxed">
              {responseB.text}
            </p>
          </Card>
        </button>

        <div className='absolute z-15 opacity-60'>
          <Icon name="swords" size={4} color="text-white"/>
        </div>


        <p className='absolute z-15 bottom-2 md:bottom-8 text-gray-300 text-sm text-center'>
          (Click once to select the fighter. Click again to make it the winner)
        </p>
      </article>,
    root
  );
} 
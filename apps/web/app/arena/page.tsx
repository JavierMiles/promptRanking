'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useModelsStore } from '@repo/store';
import { useChampionshipStore } from '@repo/store';
import type { Dimension } from '@repo/types';

import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { Task, type TaskVariant } from "@repo/ui/task";
import { Modal } from "@repo/ui/modal";

import { dimensions } from '@/api/dimension';

import { BattleModal } from './components/battle-modal';


export default function FightPage() {
  const router = useRouter();

  const { prompt } = useModelsStore();
  const [completedBattles, setCompletedBattles] = useState<Set<string>>(new Set());
  const [isBattleModalOpen, setIsBattleModalOpen] = useState(false);

  const {
    startChampionship,
    startRound,
    championship
  } = useChampionshipStore();

  useEffect(() => {
    if (prompt) {
      const models = prompt.responses.map(response => response.modelName);

      startChampionship(prompt, prompt.dimensions || dimensions, models);
    }
  }, [prompt, startChampionship, router]);

  const handleStartRound = (dimension: Dimension) => {
    startRound(dimension);
    setIsBattleModalOpen(true);
  };

  const handleBattleComplete = (dimension: Dimension | null) => {
    if (!dimension) {
      console.log('No dimension');
      return;
    }

    setCompletedBattles(prev => new Set([...prev, dimension.id]));
    setIsBattleModalOpen(false);
  };

  const responses = prompt?.responses || [];

  return (
    <div className="flex flex-col gap-4 min-h-dvh pb-20">
      <header className="text-center py-8 mb-20">
        <div className='absolute flex justify-start items-center gap-2'>
          <Button href="/" variant="ghost" icon="arrow_left_alt" shape="circle" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Fight Arena
        </h1>
        <p className="text-md text-gray-400 mt-2">
          {`${prompt?.text || '...'}`}
        </p>
        {championship?.isComplete && (
          <p className="text-md text-gray-400 mt-2">
            {`Championship is complete!`}
          </p>
        )}
      </header>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-4">
          <div className="mb-4 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">{`Battles ${completedBattles.size}/${dimensions.length}`}</h2>
            <p className="text-gray-400">
              Select a dimension to start a battle
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {(prompt?.dimensions || dimensions).map((dimension) => (
              <Task
                key={dimension.id}
                label={dimension.name}
                onClick={() => handleStartRound(dimension)}
                completed={completedBattles.has(dimension.id)}
                variant={dimension.color as TaskVariant}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 h-full">
          {responses.length > 0 ? (
            <>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-white">Fighters</h2>
                <p className="text-gray-400">
                  Responses from the models you selected
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {responses.map((response) => (
                  <Card
                    key={response.id}
                    className="text-gray-400 hover:text-gray-300 hover:bg-gray-900"
                  >
                    <p className="leading-relaxed">
                      {response.text}
                    </p>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-start gap-6 justify-start h-full ml-18">
              <h2 className="text-2xl font-semibold text-white">No fighters have been presented</h2>
              <Button
                label="Select your champions"
                icon="arrow_left_alt"
                href="/"
                variant="primary"
                size="lg"
              />
            </div>
          )}
        </div>
      </div>

      <BattleModal
        isOpen={isBattleModalOpen}
        responses={responses}
        onComplete={handleBattleComplete}
        onClose={() => setIsBattleModalOpen(false)}
      />

      <Modal
        open={championship?.isComplete}
        onClose={() => {}}
        showClose={false}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-row gap-6 text-white justify-center">
            <Icon name="crown" size={3} />
            <h2 className="text-3xl font-bold text-center">
              The Championship has ended
            </h2>
            <Icon name="trophy" size={3} />
          </div>
          <p className="text-lg text-gray-400 text-center mb-8">
            And you selected your victor
          </p>

          <Button
            label="Meet your champion"
            size="lg"
            href="./results"
          />
        </div>
      </Modal>
    </div>
  );
} 

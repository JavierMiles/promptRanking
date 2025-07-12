'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';

export interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  showClose?: boolean;
}

export const Modal = ({ 
  children, 
  open, 
  onClose, 
  showClose = true
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.getElementById('modal-root'));
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !onClose) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [onClose]);

  if (!root) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/80 bg-transparent rounded-lg max-w-full max-h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
    >
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 relative w-130 max-w-full mx-auto">
        {showClose && (
          <div className="absolute top-2 right-2">
            <Button
              onClick={onClose}
              icon="close"
              variant="ghost"
              shape="circle"
            />
          </div>
        )}

        {children}
      </div>
    </dialog>,
    root
  );
}; 
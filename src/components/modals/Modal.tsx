'use client';

import styles from './Modal.module.css';

import { useState, useEffect, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';

import Button from '../Button';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* CONTENT */}
        <div
          className={[
            styles.modalContainer,
            showModal && styles.showModal,
          ].join(' ')}
        >
          <div className={styles.modal}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>{title}</div>{' '}
              <button onClick={handleClose} className={styles.modalCloseButton}>
                <IoMdClose size={18} />
              </button>
            </div>
            {/* BODY */}
            {/* <div className='relative p-6 flex-auto'>{body}</div> */}
            <div className={styles.modalBody}>{body}</div>
            {/* FOOTER */}
            <div className={styles.modalFooter}>
              <div className={styles.footerInner}>
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}

                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

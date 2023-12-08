import React, { forwardRef, ForwardedRef } from 'react';
import styles from './styles.module.scss';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  buttons: React.ReactNode;
  title: string;
  onClose?: () => void;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ buttons, children, title, ...rest }, ref: ForwardedRef<HTMLDialogElement>) => {
    return (
      <dialog className={styles['modal']} ref={ref} {...rest}>
        <h2 className={`heading-2 ${styles['modal-title']}`}>{title}</h2>
        {children}
        <div className={styles['modal-buttons-container']}>
          {buttons}
        </div>
      </dialog>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
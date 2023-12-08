import React, { forwardRef, useImperativeHandle } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  userName: string;
  onConfirm: () => void;
}

type Ref = {
  close: () => void,
  showModal: () => void,
} | null;

const DeleteUserModal = forwardRef<Ref, ModalProps>(
  ({ userName, onConfirm, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
      return {
        showModal() {
          innerRef.current?.showModal();
        },
        close() {
          innerRef.current?.close();
        },
      };
    }, []);

    return (
      <Modal
        title={`Delete user ${userName}?`}
        ref={innerRef}
        {...rest}
        buttons={
          <>
            <Button
              color="secondary"
              onClick={() => innerRef.current?.close()}
            >
              Cancel
            </Button>
            <Button color="danger" onClick={onConfirm}>Delete user</Button>
          </>
        }
      >
        <p>This action cannot be undone.</p>
      </Modal>
    );
  }
);

DeleteUserModal.displayName = 'DeleteUserModal';

export default DeleteUserModal;
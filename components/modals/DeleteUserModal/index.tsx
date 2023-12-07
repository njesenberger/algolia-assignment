import React, { forwardRef } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  userName: string;
  onConfirm: () => void;
}

const DeleteUserModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ userName, onConfirm, ...rest }, ref) => {
    return (
      <Modal
        title={`Delete user ${userName}?`}
        ref={ref}
        {...rest}
        buttons={
          <>
            <Button
              color="secondary"
              // @ts-ignore
              onClick={() => ref.current.close()}
            >
              Cancel
            </Button>
            <Button onClick={onConfirm}>Delete user</Button>
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
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import TextField from '@/components/TextField';

import styles from './styles.module.scss';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  onConfirm: (user: User) => Promise<void>;
  user: User;
}

type Ref = {
  close: () => void,
  showModal: () => void,
} | null;

const EditUserModal = forwardRef<Ref, ModalProps>(
  ({ onConfirm, user, ...rest }, ref) => {
    const [editedUser, setEditedUser] = useState<User>(user);

    const formRef = React.useRef<HTMLFormElement>(null);
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
    });

    useEffect(() => {
      setEditedUser(user);
    }, [user]);

    const handleSubmit = async () => {
      await onConfirm(editedUser);
      innerRef.current?.close();
    };

    return (
      <Modal
        title="Edit user"
        ref={innerRef}
        onClose={() => formRef.current?.reset()}
        {...rest}
        buttons={
          <>
            <Button
              color="secondary"
              onClick={() => innerRef.current?.close()}
            >
              Cancel
            </Button>
            <Button type="submit" form="edit-user">Edit user</Button>
          </>
        }
      >
        <form
          className={styles['fields-container']}
          id="edit-user"
          action={handleSubmit}
          ref={formRef}
        >
          <TextField
            label="Name"
            value={editedUser?.name || ''}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            placeholder="John Doe"
            required
            autoFocus
          />
          <TextField
            label="Username"
            value={editedUser?.username || ''}
            onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
            placeholder="johndoe"
            required
          />
          <TextField
            label="Email"
            value={editedUser?.email || ''}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            type="email"
            placeholder="john@doe.com"
            required
          />
        </form>
      </Modal>
    );
  }
);

EditUserModal.displayName = 'EditUserModal';

export default EditUserModal;
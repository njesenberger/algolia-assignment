import React, { forwardRef, useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import TextField from '@/components/TextField';

import styles from './styles.module.scss';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  onConfirm: (user: User) => Promise<void>;
  user: User;
}

const EditUserModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ onConfirm, user, ...rest }, ref) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const [editedUser, setEditedUser] = useState<User>(user);

    useEffect(() => {
      setEditedUser(user);
    }, [user]);

    const handleSubmit = async () => {
      await onConfirm(editedUser);
      // @ts-ignore
      ref.current.close();
    };

    return (
      <Modal
        title="Edit user"
        ref={ref}
        // @ts-ignore
        onClose={() => formRef.current?.reset()}
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
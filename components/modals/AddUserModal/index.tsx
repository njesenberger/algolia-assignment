import React, { forwardRef } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import TextField from '@/components/TextField';

import styles from './styles.module.scss';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  onConfirm (user: Omit<User, 'id'>): void;
}

const AddUserModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ onConfirm, ...rest }, ref) => {
    const formRef = React.useRef<HTMLFormElement>(null);

    // @ts-ignore
    const handleSubmit = async (formData) => {
      const email: string = formData.get('email');
      const name = formData.get('name');
      const username = formData.get('username');
      await onConfirm({ username, name, email });
      // @ts-ignore
      ref.current.close();
    };

    return (
      <Modal
        title="Add user"
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
            <Button type="submit" form="add-user">Add user</Button>
          </>
        }
      >
        <form
          className={styles['fields-container']}
          id="add-user"
          action={handleSubmit}
          ref={formRef}
        >
          <TextField label="Name" name="name" autoFocus placeholder="John Doe" required />
          <TextField label="Username" name="username" placeholder="johndoe" required />
          <TextField label="Email" name="email" type="email" placeholder="john@doe.com" required />
        </form>
      </Modal>
    );
  }
);

AddUserModal.displayName = 'AddUserModal';

export default AddUserModal;
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import TextField from '@/components/TextField';

import styles from './styles.module.scss';

type Ref = {
  close: () => void,
  showModal: () => void,
} | null;

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  onConfirm (user: Omit<User, 'id'>): Promise<Omit<User, 'id'>>;
}

const AddUserModal = forwardRef<Ref, ModalProps>(
  ({ onConfirm, ...rest }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);

    const innerRef = useRef<HTMLDialogElement>(null);

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

    const handleSubmit = async (formData: FormData) => {
      const email = formData.get('email') as string;
      const name = formData.get('name') as string;
      const username = formData.get('username') as string;
      await onConfirm({ username, name, email });
      innerRef.current?.close();
    };

    return (
      <Modal
        title="Add user"
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
          <TextField 
            label="Name" 
            name="name" 
            placeholder="John Doe"
            spellCheck="false"
            required
            autoFocus 
          />
          <TextField 
            label="Username" 
            name="username" 
            placeholder="johndoe" 
            spellCheck="false"
            required
          />
          <TextField 
            label="Email" 
            name="email" 
            type="email" 
            placeholder="john@doe.com" 
            required
          />
        </form>
      </Modal>
    );
  }
);

AddUserModal.displayName = 'AddUserModal';

export default AddUserModal;
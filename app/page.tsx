'use client';

import Button from '@/components/Button';
import Table from '@/components/table/Table';
import TableHeader from '@/components/table/TableHeader';
import TableHeaderCell from '@/components/table/TableHeaderCell';
import TableBody from '@/components/table/TableBody';
import TableRow from '@/components/table/TableRow';
import TableCell from '@/components/table/TableCell';
import TableActionsCell from '@/components/table/TableActionsCell';
import TableIconButton from '@/components/table/TableIconButton';
import AddUserModal from '@/components/modals/AddUserModal';
import EditUserModal from '@/components/modals/EditUserModal';
import DeleteUserModal from '@/components/modals/DeleteUserModal';

import styles from './page.module.scss';

import { useEffect, useState, useRef } from 'react';

const getUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await response.json();
    return users;
  } catch {
    throw new Error('Failed to fetch users');
  }
};

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const addUserModalRef = useRef<HTMLDialogElement>(null);
  const editUserModalRef = useRef<HTMLDialogElement>(null);
  const deleteUserModalRef = useRef<HTMLDialogElement>(null);

  const openAddUserModal = () => {
    addUserModalRef.current?.showModal();
  };

  const openEditUserModal = (user: User) => {
    setSelectedUser(user);
    editUserModalRef.current?.showModal();
  };

  const openDeleteUserModal = (user: User) => {
    setSelectedUser(user);
    deleteUserModalRef.current?.showModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchData();
  }, []);

  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      return user;
    } catch {
      throw new Error('Failed to add user');
    }
  };

  const editUser = async (user: User) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const updatedUser = await response.json();
      setUsers(users.map((user) => user.id === updatedUser.id ? updatedUser : user));
      editUserModalRef.current?.close();
      return updatedUser;
    } catch {
      throw new Error('Failed to edit user');
    }
  };


  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.id !== id));
      deleteUserModalRef.current?.close();
      return response;
    } catch {
      throw new Error('Failed to delete user');
    }
  };

  return (
    <main className="main">
      <div className={styles['headline-container']}>
        <h1 className="heading-1">User list</h1>
        <Button onClick={openAddUserModal}>Add user</Button>
      </div>
      <Table>
        <TableHeader>
          <TableHeaderCell alignEnd>ID</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell alignEnd>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableActionsCell>
                <TableIconButton label="Edit" onClick={() => openEditUserModal(user)} icon="pencil" />
                <TableIconButton label="Delete" onClick={() => openDeleteUserModal(user)} icon="trash" />
              </TableActionsCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddUserModal ref={addUserModalRef} onConfirm={addUser} />
      <EditUserModal 
        ref={editUserModalRef}
        user={selectedUser!}
        onConfirm={editUser}
      />
      <DeleteUserModal 
        ref={deleteUserModalRef}
        userName={selectedUser?.name || ''}
        onConfirm={() => deleteUser(selectedUser!.id)}
      />
    </main>
  );
};
import React, { useState, useEffect } from 'react';
import { useDeleteUserMutation, useGetAllUsersQuery, useDeactivateUserMutation, useChangeUserRoleMutation } from '../../Apis/userManagementApi';
import { Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Pagination, Badge, Avatar, Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import toastNotify from '../../Taghelper/toastNotify';

const UserManagement: React.FC = () => {
  const { data = { result: [] }, error, isLoading, refetch } = useGetAllUsersQuery({});
  const usersData = data.result || [];

  const [page, setPage] = useState<number>(1);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const resultsPerPage = 15;

  const [deleteUser] = useDeleteUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const [changeUserRole] = useChangeUserRoleMutation();

  // State for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null); // Track the selected user for actions
  const [newRole, setNewRole] = useState<string>(''); // New role state for change role functionality

  useEffect(() => {
    if (Array.isArray(usersData)) {
      const slicedData = usersData.slice((page - 1) * resultsPerPage, page * resultsPerPage);
      setPaginatedData(slicedData);
    }
  }, [page, usersData]);

  const onPageChange = (p: number) => {
    setPage(p);
  };

  // Open modal for delete confirmation
  const openModal = (userId: string) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete).unwrap();
        toastNotify("The user has been deleted", 'success');
        refetch(); 
      } catch (error) {
        toastNotify("Failed to delete the user. Please try again.", 'error');
      }
      closeModal();
    }
  };

  // Deactivate user
  const handleDeactivateUser = async (userId: string) => {
    try {
      await deactivateUser(userId).unwrap();
      toastNotify("User has been deactivated", 'success');
      refetch();
    } catch (error) {
      toastNotify("Failed to deactivate user", 'error');
    }
  };

  // Change user role
  const handleChangeUserRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      await changeUserRole({ userId: selectedUser.id, newRole }).unwrap();
      toastNotify(`Role changed to ${newRole} successfully`, 'success');
      refetch();
    } catch (error) {
      toastNotify("Failed to change user role", 'error');
    }
    setSelectedUser(null); // Reset user selection
  };

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">User Management</h1>
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error loading users</p>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Avatar</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {paginatedData.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Avatar src={user.avatarUrl} alt="User image" />
                    </TableCell>
                    <TableCell>
                      <Badge>{user.firstName}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{user.lastName}</Badge>
                    </TableCell>
                    <TableCell>
                      <span>{user.email}</span>
                    </TableCell>
                    <TableCell>
                      <span>{user.role}</span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => openModal(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleDeactivateUser(user.id)}
                        className="bg-yellow-500 text-white px-4 py-2 ml-2 rounded hover:bg-yellow-700"
                      >
                        Deactivate
                      </button>
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700"
                      >
                        Change Role
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
            <Pagination totalResults={usersData.length}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
                />
            </TableFooter>  
          </TableContainer>

          {/* Delete confirmation modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalBody>Are you sure you want to delete this user?</ModalBody>
            <ModalFooter>
              <Button onClick={closeModal}>Cancel</Button>
              <Button onClick={confirmDelete}>Confirm</Button>
            </ModalFooter>
          </Modal>

          {/* Change role modal */}
          {selectedUser && (
            <Modal isOpen={Boolean(selectedUser)} onClose={() => setSelectedUser(null)}>
              <ModalHeader>Change Role for {selectedUser.firstName}</ModalHeader>
              <ModalBody>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Enter new role"
                  className="p-2 border border-gray-300 rounded"
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setSelectedUser(null)}>Cancel</Button>
                <Button onClick={handleChangeUserRole}>Change Role</Button>
              </ModalFooter>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default UserManagement;

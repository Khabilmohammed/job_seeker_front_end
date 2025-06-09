import React, { useState, useEffect } from 'react';
import { useDeleteUserMutation, useGetAllUsersQuery, useDeactivateUserMutation, useChangeUserRoleMutation, useReactivateUserMutation } from '../../Apis/userManagementApi';
import toastNotify from '../../Taghelper/toastNotify';
import { FaUserAlt } from 'react-icons/fa';
import { Badge, Avatar, Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@windmill/react-ui';
import TableComponent from '../../Componenets/Shared/TableComponent';

const UserManagement: React.FC = () => {
  const { data = { result: [] }, error, isLoading, refetch } = useGetAllUsersQuery({});
  const usersData = data.result || [];
  const [page, setPage] = useState<number>(1);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const resultsPerPage = 15;

  const [deleteUser] = useDeleteUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const [changeUserRole] = useChangeUserRoleMutation();
  const [reactivateUser] = useReactivateUserMutation();

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

  const handleToggleUserStatus = async (user: any) => {
  try {
    if (user.lockoutEnd && new Date(user.lockoutEnd) > new Date()) {
      // User is deactivated -> Reactivate
      await reactivateUser(user.id).unwrap();
      toastNotify("User has been reactivated", 'success');
    } else {
      // User is active -> Deactivate
      await deactivateUser(user.id).unwrap();
      toastNotify("User has been deactivated", 'success');
    }
    refetch();
  } catch (error) {
    toastNotify("Failed to change user status", 'error');
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
    setSelectedUser(null);
  };

  // Define the row rendering logic
  const renderRow = (user: any) => (
    <tr key={user.id}>
      <td>
        {user.profilePicture ? (
          <Avatar src={user.profilePicture} alt="User image" />
        ) : (
          <Badge type="neutral" className="p-1 rounded-full">
            <FaUserAlt className="w-6 h-6 text-gray-600" />
          </Badge>
        )}
      </td>
      <td>
        <Badge>{user.firstName}</Badge>
      </td>
      <td>
        <Badge>{user.lastName}</Badge>
      </td>
      <td>
        <span>{user.email}</span>
      </td>
      <td>
        <span>{user.role}</span>
      </td>
      <td>
        <button
          onClick={() => openModal(user.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
        <button
  onClick={() => handleToggleUserStatus(user)}
  className={`${
    user.lockoutEnd && new Date(user.lockoutEnd) > new Date()
      ? "bg-green-500 hover:bg-green-700"
      : "bg-yellow-500 hover:bg-yellow-700"
  } text-white px-4 py-2 ml-2 rounded`}
>
  {user.lockoutEnd && new Date(user.lockoutEnd) > new Date()
    ? "Reactivate"
    : "Deactivate"}
</button>
        <button
          onClick={() => setSelectedUser(user)}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700"
        >
          Change Role
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">User Management</h1>
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error loading users</p>
      ) : (
        <TableComponent
          headers={['Avatar', 'First Name', 'Last Name', 'Email', 'Role', 'Actions']}
          data={paginatedData}
          resultsPerPage={resultsPerPage}
          totalResults={usersData.length}
          onPageChange={onPageChange}
          renderRow={renderRow}
        />
      )}

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
  );
};

export default UserManagement;

import React, { useState, useEffect } from 'react';
import { useDeleteUserMutation, useGetAllUsersQuery, useDeactivateUserMutation, useChangeUserRoleMutation, useReactivateUserMutation } from '../../Apis/userManagementApi';
import toastNotify from '../../Taghelper/toastNotify';
import { FaUserAlt, FaUserShield, FaBuilding, FaUser, FaExclamationTriangle, FaCheck, FaTimes } from 'react-icons/fa';
import { Badge, Avatar, Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@windmill/react-ui';
import TableComponent from '../../Componenets/Shared/TableComponent';
import ConfirmationModal from '../../Componenets/Shared/ConfirmationModal';
import { SD_Roles } from '../../Utility/SD';

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

  // State for deactivation confirmation modal
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState<any>(null);

  // Enhanced state for role change modal
  const [isRoleChangeModalOpen, setIsRoleChangeModalOpen] = useState(false);
  const [isRoleChangeConfirmOpen, setIsRoleChangeConfirmOpen] = useState(false);
  const [roleChangeLoading, setRoleChangeLoading] = useState(false);
  const [roleValidationError, setRoleValidationError] = useState<string>('');

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

  // Open modal for deactivate confirmation
  const openDeactivateModal = (user: any) => {
    setUserToDeactivate(user);
    setIsDeactivateModalOpen(true);
  };

  const closeDeactivateModal = () => {
    setIsDeactivateModalOpen(false);
    setUserToDeactivate(null);
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

  // Confirm deactivation
  const confirmDeactivateUser = async () => {
    if (userToDeactivate) {
      try {
        await deactivateUser(userToDeactivate.id).unwrap();
        toastNotify("User has been deactivated", 'success');
        refetch();
      } catch (error) {
        toastNotify("Failed to deactivate user", 'error');
      }
      closeDeactivateModal();
    }
  };

  const handleToggleUserStatus = async (user: any) => {
    try {
      if (user.lockoutEnd && new Date(user.lockoutEnd) > new Date()) {
        // User is deactivated -> Reactivate (no confirmation needed)
        await reactivateUser(user.id).unwrap();
        toastNotify("User has been reactivated", 'success');
        refetch();
      } else {
        // User is active -> Show deactivation confirmation
        openDeactivateModal(user);
      }
    } catch (error) {
      toastNotify("Failed to change user status", 'error');
    }
  };

  // Role definitions with descriptions and icons
  const roleOptions = [
    {
      value: SD_Roles.ADMIN,
      label: 'Administrator',
      description: 'Full system access with user and content management capabilities',
      icon: FaUserShield,
      color: 'text-red-600'
    },
    {
      value: SD_Roles.USER,
      label: 'Job Seeker',
      description: 'Standard user with job search and networking features',
      icon: FaUser,
      color: 'text-blue-600'
    },
    {
      value: SD_Roles.COMPANY,
      label: 'Company',
      description: 'Business account with job posting and candidate management features',
      icon: FaBuilding,
      color: 'text-green-600'
    }
  ];

  // Enhanced role change handlers
  const openRoleChangeModal = (user: any) => {
    setSelectedUser(user);
    setNewRole(user.role); // Set current role as default
    setRoleValidationError('');
    setIsRoleChangeModalOpen(true);
  };

  const closeRoleChangeModal = () => {
    setSelectedUser(null);
    setNewRole('');
    setRoleValidationError('');
    setIsRoleChangeModalOpen(false);
    setIsRoleChangeConfirmOpen(false);
  };

  const validateRoleChange = (): boolean => {
    if (!newRole) {
      setRoleValidationError('Please select a role');
      return false;
    }

    if (newRole === selectedUser?.role) {
      setRoleValidationError('Please select a different role from the current one');
      return false;
    }

    const validRoles = Object.values(SD_Roles);
    if (!validRoles.includes(newRole as SD_Roles)) {
      setRoleValidationError('Invalid role selected');
      return false;
    }

    setRoleValidationError('');
    return true;
  };

  const handleRoleChangeSubmit = () => {
    if (validateRoleChange()) {
      setIsRoleChangeConfirmOpen(true);
    }
  };

  // Change user role with enhanced error handling
  const handleChangeUserRole = async () => {
    if (!selectedUser || !newRole) return;

    setRoleChangeLoading(true);
    try {
      await changeUserRole({ userId: selectedUser.id, newRole }).unwrap();
      toastNotify(`Role changed to ${roleOptions.find(r => r.value === newRole)?.label} successfully`, 'success');
      refetch();
      closeRoleChangeModal();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to change user role";
      toastNotify(errorMessage, 'error');
    } finally {
      setRoleChangeLoading(false);
    }
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
          onClick={() => openRoleChangeModal(user)}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700 transition-colors duration-200"
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

      {/* Enhanced Change Role Modal */}
      {isRoleChangeModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full">
                    <FaUserShield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Change User Role</h3>
                    <p className="text-blue-100 text-sm">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeRoleChangeModal}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors duration-200"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Current Role Display */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Current Role:</span>
                  <span className="text-sm font-semibold text-gray-800 capitalize">
                    {roleOptions.find(r => r.value === selectedUser.role)?.label || selectedUser.role}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {roleOptions.find(r => r.value === selectedUser.role)?.description}
                </p>
              </div>

              {/* Role Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select New Role <span className="text-red-500">*</span>
                </label>

                <div className="space-y-3">
                  {roleOptions.map((role) => {
                    const IconComponent = role.icon;
                    const isSelected = newRole === role.value;
                    const isCurrent = selectedUser.role === role.value;

                    return (
                      <div
                        key={role.value}
                        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : isCurrent
                            ? 'border-gray-300 bg-gray-50 opacity-60 cursor-not-allowed'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => !isCurrent && setNewRole(role.value)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <IconComponent className={`w-4 h-4 ${isSelected ? role.color : 'text-gray-500'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                                {role.label}
                              </h4>
                              {isCurrent && (
                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className={`text-sm mt-1 ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                              {role.description}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="text-blue-500">
                              <FaCheck className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Validation Error */}
                {roleValidationError && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                    <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{roleValidationError}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
              <button
                onClick={closeRoleChangeModal}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChangeSubmit}
                disabled={!newRole || newRole === selectedUser.role}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Change Confirmation Modal */}
      {isRoleChangeConfirmOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            {/* Confirmation Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <FaExclamationTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Confirm Role Change</h3>
                  <p className="text-orange-100 text-sm">This action will change user permissions</p>
                </div>
              </div>
            </div>

            {/* Confirmation Body */}
            <div className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Are you sure you want to change the role for{' '}
                  <span className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</span>?
                </p>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">User Email:</span>
                    <span className="text-sm font-medium">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Role:</span>
                    <span className="text-sm font-medium capitalize">
                      {roleOptions.find(r => r.value === selectedUser.role)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New Role:</span>
                    <span className="text-sm font-medium text-blue-600 capitalize">
                      {roleOptions.find(r => r.value === newRole)?.label}
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <FaExclamationTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Important:</p>
                      <p>Changing the user's role will immediately affect their access permissions and available features.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
              <button
                onClick={() => setIsRoleChangeConfirmOpen(false)}
                disabled={roleChangeLoading}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeUserRole}
                disabled={roleChangeLoading}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-orange-400 transition-colors duration-200 font-medium flex items-center space-x-2"
              >
                {roleChangeLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Changing...</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="w-4 h-4" />
                    <span>Confirm Change</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate confirmation modal */}
      <ConfirmationModal
        show={isDeactivateModalOpen}
        title="Confirm User Deactivation"
        message={
          userToDeactivate
            ? `Are you sure you want to deactivate this user?\n\nUser: ${userToDeactivate.firstName} ${userToDeactivate.lastName}\nEmail: ${userToDeactivate.email}\n\nThis action will prevent the user from accessing their account.`
            : "Are you sure you want to deactivate this user?"
        }
        confirmText="Deactivate"
        onConfirm={confirmDeactivateUser}
        onCancel={closeDeactivateModal}
      />
    </>
  );
};

export default UserManagement;

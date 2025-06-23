import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Button, Tooltip } from '@mui/material';
import { FaUserAlt, FaTrash, FaUserShield, FaUserEdit, FaCheck, FaExclamationTriangle, FaTimes, FaBuilding, FaUser } from 'react-icons/fa';
import { useDeleteUserMutation, useGetAllUsersQuery, useDeactivateUserMutation, useReactivateUserMutation, useChangeUserRoleMutation } from '../../Apis/userManagementApi';
import toastNotify from '../../Taghelper/toastNotify';
import ConfirmationModal from '../../Componenets/Shared/ConfirmationModal';
import { SD_Roles } from '../../Utility/SD';

const UserManagement: React.FC = () => {
  const { data = { result: [] }, error, isLoading, refetch } = useGetAllUsersQuery({});
  const usersData = data.result || [];

  const [deleteUser] = useDeleteUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const [reactivateUser] = useReactivateUserMutation();
  const [changeUserRole] = useChangeUserRoleMutation();

  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [newRole, setNewRole] = useState<string>('');
  const [isRoleChangeModalOpen, setIsRoleChangeModalOpen] = useState(false);
  const [isRoleChangeConfirmOpen, setIsRoleChangeConfirmOpen] = useState(false);
  const [roleValidationError, setRoleValidationError] = useState('');
  const [roleChangeLoading, setRoleChangeLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

const filteredUsers = usersData.filter((user:any) => {
  const search = searchText.toLowerCase();
  return (
    user.firstName.toLowerCase().includes(search) ||
    user.lastName.toLowerCase().includes(search) ||
    user.email.toLowerCase().includes(search) ||
    user.role.toLowerCase().includes(search)
  );
});

  

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
      } catch {
        toastNotify("Failed to delete the user", 'error');
      }
      closeModal();
    }
  };

  const handleToggleUserStatus = async (user: any) => {
    try {
      const isLockedOut = user.lockoutEnd && new Date(user.lockoutEnd) > new Date();
      if (isLockedOut) {
        await reactivateUser(user.id).unwrap();
        toastNotify("User reactivated", 'success');
      } else {
        await deactivateUser(user.id).unwrap();
        toastNotify("User deactivated", 'success');
      }
      refetch();
    } catch {
      toastNotify("Failed to update user status", 'error');
    }
  };

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

  const openRoleChangeModal = (user: any) => {
    setSelectedUser(user);
    setNewRole(user.role);
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

  const columns: GridColDef[] = useMemo(() => [
    {
      field: 'profilePicture',
      headerName: 'Avatar',
      width: 90,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        params.value ? (
          <Avatar src={params.value} />
        ) : (
          <Avatar>
            <FaUserAlt />
          </Avatar>
        )
      ),
      sortable: false,
      filterable: false,
    },
    { field: 'firstName', headerName: 'First Name', width: 150 , align: 'center',headerAlign: 'center'},
    { field: 'lastName', headerName: 'Last Name', width: 140, align: 'center', headerAlign: 'center' },
    { field: 'email', headerName: 'Email', width: 250, align: 'center',headerAlign: 'center' },
    { field: 'role', headerName: 'Role', width: 130, align: 'center',headerAlign: 'center'},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 450,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const user = params.row;
        const isLockedOut = user.lockoutEnd && new Date(user.lockoutEnd) > new Date();
        return (
          <div className="flex items-center gap-4">
            <Tooltip title="Delete">
              <Button
                onClick={() => openModal(user.id)}
                variant="contained"
                color="error"
                size="small"
                startIcon={<FaTrash />}
              >
                Delete
              </Button>
            </Tooltip>
            <Tooltip title={isLockedOut ? 'Reactivate' : 'Deactivate'}>
              <Button
                onClick={() => handleToggleUserStatus(user)}
                variant="contained"
                color={isLockedOut ? 'success' : 'warning'}
                size="small"
                startIcon={<FaUserShield color={isLockedOut ? 'green' : 'orange'} />}
              >
                {isLockedOut ? 'Reactivate' : 'Deactivate'}
              </Button>
            </Tooltip>
            <Tooltip title="Change Role">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => openRoleChangeModal(user)}
                startIcon={<FaUserEdit />}
              >
                Role
              </Button>
            </Tooltip>
          </div>
        );
      }
    }
  ], []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <div className="mb-4">
  <input
    type="text"
    placeholder="Search by name, email, or role"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
      <div style={{ height: 530, width: '100%' }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
                page: 0,
              },
            },
          }}
          getRowId={(row) => row.id}
          loading={isLoading}
          sx={{
            border: '1px solid #93c5fd', // Tailwind's blue-300
            borderRadius: '0.5rem',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0f2fe', // Optional: light blue row lines
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#eff6ff', // Optional: light blue column header background
            }
          }}
        />
      </div>

      <ConfirmationModal
        show={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user?"
        onConfirm={confirmDelete}
        onCancel={closeModal}
        confirmText="Delete"
      />

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
    </div>
  );
};

export default UserManagement;

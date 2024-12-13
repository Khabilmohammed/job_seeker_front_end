import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userManagementApi = createApi({
    reducerPath: "userManagementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5134/api/userManagement",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (userId) => `getuserid/${userId}`,
        }),
        getAllUsers: builder.query({
            query: () => 'getuserall',
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `delete/${userId}`,
                method: "DELETE",
            }),
        }),
        getUserDetails: builder.query({
            query: (userId) => `details/${userId}`,
        }),
        getUsersByRole: builder.query({
            query: (role) => `role/${role}`,
        }),
        deactivateUser: builder.mutation({
            query: (userId) => ({
                url: `deactivate/${userId}`,
                method: "POST",
            }),
        }),
        changeUserRole: builder.mutation({
            query: (request) => ({
                url: 'changeuserrole',
                method: "POST",
                body: request,
            }),
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "update",
                method: "PUT",
                body: formData,
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetUserByIdQuery,
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useGetUsersByRoleQuery,
    useDeactivateUserMutation,
    useChangeUserRoleMutation,
    useUpdateUserMutation,
} = userManagementApi;

export default userManagementApi;

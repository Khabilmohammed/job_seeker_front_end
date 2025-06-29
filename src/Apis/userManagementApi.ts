import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const userManagementApi = createApi({
    reducerPath: "userManagementApi",
    baseQuery: createBaseQuery(),
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (userId) => `userManagement/getuserid/${userId}`,
        }),
        getAllUsers: builder.query({
            query: () => 'userManagement/getuserall',
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `userManagement/delete/${userId}`,
                method: "DELETE",
            }),
        }),
        getUserDetails: builder.query({
            query: (userId) => `userManagement/details/${userId}`,
        }),
         reactivateUser: builder.mutation({
            query: (userId) => ({
                url: `userManagement/reactivate/${userId}`,
                method: "POST",
            }),
        }),
        getUsersByRole: builder.query({
            query: (role) => `userManagement/role/${role}`,
        }),
        deactivateUser: builder.mutation({
            query: (userId) => ({
                url: `userManagement/deactivate/${userId}`,
                method: "POST",
            }),
        }),
        changeUserRole: builder.mutation({
            query: (request) => ({
                url: 'userManagement/changeuserrole',
                method: "POST",
                body: request,
            }),
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "userManagement/update",
                method: "PUT",
                body: formData,
            }),
        }),
    }),
});

export const {
    useGetUserByIdQuery,
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useGetUsersByRoleQuery,
    useDeactivateUserMutation,
    useChangeUserRoleMutation,
    useReactivateUserMutation,
    useUpdateUserMutation,
} = userManagementApi;

export default userManagementApi;

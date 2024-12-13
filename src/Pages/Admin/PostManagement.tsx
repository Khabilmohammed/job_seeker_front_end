import React, { useState, useEffect } from 'react';
import { useDeletePostMutation, useGetAllPostsQuery } from '../../Apis/postApi';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@windmill/react-ui';
import toastNotify from '../../Taghelper/toastNotify';

const PostManagement: React.FC = () => {
  const { data = { result: [] }, error, isLoading, refetch } = useGetAllPostsQuery({});
  const postsData = data.result || [];

  const [page, setPage] = useState<number>(1);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const resultsPerPage = 10;

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  // State for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (Array.isArray(postsData)) {
      const slicedData = postsData.slice((page - 1) * resultsPerPage, page * resultsPerPage);
      setPaginatedData(slicedData);
    }
  }, [page, postsData]);

  const onPageChange = (p: number) => {
    setPage(p);
  };

  // Open modal for delete confirmation
  const openModal = (postId: string) => {
    setPostToDelete(postId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPostToDelete(null);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        // Call the deletePost mutation with the post ID
        await deletePost(postToDelete).unwrap();
        toastNotify("The post has been deleted", 'success');
        refetch(); // Refetch posts to update the list
      } catch (error: any) {
        console.error("Delete failed: ", error); // Log error details
        toastNotify("Failed to delete the post. Please try again.", 'error');
      }
      closeModal();
    }
  };

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Post Management</h1>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error loading posts:</p> // Display error message
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Post ID</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {paginatedData.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <span>{post.id}</span>
                    </TableCell>
                    <TableCell>
                      <span>{post.content}</span>
                    </TableCell>
                    <TableCell>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => openModal(post.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={postsData.length}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
              />
            </TableFooter>
          </TableContainer>
          {/* Delete confirmation modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalBody>Are you sure you want to delete this post?</ModalBody>
            <ModalFooter>
              <Button onClick={closeModal}>Cancel</Button>
              <Button onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Confirm'}
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </>
  );
};

export default PostManagement;

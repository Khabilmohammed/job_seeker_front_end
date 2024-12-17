import React, { useState, useEffect } from 'react';
import { useDeletePostMutation, useGetAllPostsQuery } from '../../Apis/postApi';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, TableRow, TableCell } from '@windmill/react-ui';
import toastNotify from '../../Taghelper/toastNotify';
import TableComponent from '../../Componenets/Shared/TableComponent';

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
        toastNotify('The post has been deleted', 'success');
        refetch(); // Refetch posts to update the list
      } catch (error: any) {
        console.error('Delete failed: ', error); // Log error details
        toastNotify('Failed to delete the post. Please try again.', 'error');
      }
      closeModal();
    }
  };

  const renderRow = (post: any) => (
    <TableRow key={post.postId}>
      <TableCell>
        <span>{post.postId}</span>
      </TableCell>
      <TableCell>
        <span>{post.content}</span>
      </TableCell>
      <TableCell>
        <img
          src={post.images[0].imageUrl}
          alt="Post"
          className="w-20 h-20 rounded object-cover"
        />
      </TableCell>
      <TableCell>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </TableCell>
      <TableCell>
        <span>{post.likeCount}</span>
      </TableCell>
      <TableCell>
        <span>{post.commentCount}</span>
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
  );

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Post Management</h1>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error loading posts:</p>
      ) : (
        <TableComponent
          headers={['Post ID', 'Description', 'Image', 'Created At', 'Like Count', 'Comment Count', 'Actions']}
          data={paginatedData}
          resultsPerPage={resultsPerPage}
          totalResults={postsData.length}
          onPageChange={onPageChange}
          renderRow={renderRow}
        />
      )}

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
  );
};

export default PostManagement;

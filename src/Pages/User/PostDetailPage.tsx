import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useGetPostByIdQuery, useDeletePostMutation, useUpdatePostMutation } from "../../Apis/postApi";
import { useGetCommentsForPostQuery } from "../../Apis/commentApi";
import { useGetLikesForPostQuery } from "../../Apis/likeApi";
import toastNotify from "../../Taghelper/toastNotify";

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const { data: postResponse, isLoading: postLoading, refetch: refetchPost } = useGetPostByIdQuery(postId);
  const { data: commentResponse, isLoading: commentsLoading, refetch: refetchComments } = useGetCommentsForPostQuery(postId);
  const { data: likeResponse, isLoading: likesLoading, refetch: refetchLikes } = useGetLikesForPostQuery(postId);

  const [deletePost, { isSuccess: isDeleteSuccess }] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Selected image
  const [isEditing, setIsEditing] = useState(false); // Edit mode state
  const [updatedContent, setUpdatedContent] = useState(""); // New content for editing

  useEffect(() => {
    if (postResponse) {
      setUpdatedContent(postResponse.result.content);
    }
  }, [postResponse]);

  useEffect(() => {
    if (isDeleteSuccess) {
      refetchPost();
      refetchComments();
      refetchLikes(); 
      navigate("/user/userProfile");
    }
  }, [isDeleteSuccess, refetchPost, refetchComments, refetchLikes, navigate]);

  // Handle loading state
  if (postLoading || commentsLoading || likesLoading) return <p>Loading...</p>;

  // Handle case where post is not found
  if (!postResponse) return <p>Post not found</p>;

  // Access the comments array from the response
  const comments = commentResponse?.result.comments || [];
  const likes = likeResponse?.result || [];
  const post = postResponse?.result || [];

  // Function to handle image click and open modal
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Delete post function
  const handleDeletePost = async () => {
    try {
      await deletePost(postId!); // Call delete API
      toastNotify("Deleted the post", "info");
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  // Toggle edit mode
  const handleEditPost = () => {
    setIsEditing(true);
  };

  // Save edited post content
// Save edited post content
const handleSavePost = async () => {
  try {
      const updatedPost = { content: updatedContent }; // Prepare the payload
      await updatePost({ postId: postId!, updatedPost }); 
      setIsEditing(false);
      toastNotify("Post updated successfully", "success");
      refetchPost(); 
  } catch (error) {
      console.error("Failed to update post", error);
      toastNotify("Error updating post", "error");
  }
};

  return (
    <div className="container mx-auto mt-8 space-y-8">
      {/* Post Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <div className="flex items-start space-x-4">
          <img
            src={post.userProfilePicture || "https://via.placeholder.com/50"}
            alt="User"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="w-full">
            <h2 className="font-bold text-xl text-gray-800 mb-1">{post.userName}</h2>

            {isEditing ? (
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
            ) : (
              <p className="text-gray-600 mb-4">{post.content}</p>
            )}

            {post.images?.[0]?.imageUrl && (
              <img
                src={post.images[0].imageUrl || "https://via.placeholder.com/200"}
                alt="Post"
                className="w-full h-72 object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(post.images[0].imageUrl)} // Click event for zoom
              />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 text-gray-600">
          <span>{likes.length} Likes</span>
          <span>{comments.length} Comments</span>
        </div>

        {/* Buttons for Edit and Delete */}
        <div className="mt-4 flex space-x-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={handleDeletePost}
          >
            Delete Post
          </button>

          {isEditing ? (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              onClick={handleSavePost}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handleEditPost}
            >
              Edit Post
            </button>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h3 className="font-bold text-xl text-gray-800 mb-4">Comments</h3>
        {comments.length ? (
          comments.map((comment: any) => (
            <div key={comment.commentId} className="border-b py-4">
              <div className="flex items-center space-x-4 mb-2">
                <img
                  src="https://via.placeholder.com/40" // You can replace this with the user's profile picture
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold text-gray-800">{comment.userName}</span>
                  <p className="text-sm text-gray-600">{format(new Date(comment.createdAt), "MMM d, yyyy, h:mm a")}</p>
                </div>
              </div>
              <p className="text-gray-700 ml-14">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
      </div>

      {/* Likes Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h3 className="font-bold text-xl text-gray-800 mb-4">People who liked this post</h3>
        {likes.length ? (
          <div className="grid grid-cols-2 gap-4">
            {likes.map((like: any) => (
              <div key={like.userId} className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/40" // Placeholder image for user avatars
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-gray-700">{like.userName}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No likes yet.</p>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Zoomed"
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 focus:outline-none"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;

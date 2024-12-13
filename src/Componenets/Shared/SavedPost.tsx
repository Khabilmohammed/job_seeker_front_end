import React from "react";
import { useGetUserSavedPostsQuery, useRemoveSavedPostMutation } from "../../Apis/savedPostApi";
import { Rootstate } from "../../Storage/Redux/store";
import { useSelector } from "react-redux";

const SavedPost: React.FC = () => {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data: saveddata, error, isLoading, refetch } = useGetUserSavedPostsQuery(userId);
  const [removeSavedPost, { isLoading: isRemoving }] = useRemoveSavedPostMutation();

  const savedPosts = saveddata?.result || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading saved posts.</p>;

  const handleRemovePost = async (postId: number) => {
    try {
      await removeSavedPost(postId).unwrap(); // Call the mutation to remove the post
      console.log(`Post with ID: ${postId} removed successfully`);
      refetch(); // Trigger refetch after post removal
    } catch (err) {
      console.error("Failed to remove post:", err);
    }
  };

  console.log("savedPosts", savedPosts);

  return (
    <div className="saved-posts p-4">
      <h2 className="text-lg font-bold mb-4">Saved Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {savedPosts.map((savedPost: any) => (
          <div
            key={savedPost.postId}
            className="saved-post bg-white border rounded-md shadow-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center p-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="ml-3">
                <p className="text-sm font-medium">{savedPost.userName}</p>
                <p className="text-xs text-gray-500">
                  {new Date(savedPost.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div>
              {savedPost.imageUrls.length > 0 && (
                <img
                  src={savedPost.imageUrls[0]}
                  alt="Post"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-3">
                <p className="text-sm truncate">{savedPost.postContent}</p>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>{savedPost.likeCount} Likes</span>
                  <span>{savedPost.commentCount} Comments</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-3 py-2 border-t">
              <button
                className="text-xs text-blue-500 font-medium hover:underline"
                onClick={() => console.log("Like post", savedPost.postId)}
              >
                Like
              </button>
              <button
                className="text-xs text-blue-500 font-medium hover:underline"
                onClick={() => console.log("Comment on post", savedPost.postId)}
              >
                Comment
              </button>
              <button
                className="text-xs text-red-500 font-medium hover:underline"
                onClick={() => handleRemovePost(savedPost.postId)}
                disabled={isRemoving} // Disable while removing
              >
                {isRemoving ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPost;

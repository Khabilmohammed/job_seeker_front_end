import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserSavedPostsQuery, useRemoveSavedPostMutation } from "../../Apis/savedPostApi";
import { Rootstate } from "../../Storage/Redux/store";
import { setSavedPosts, removeSavedPostFromRedux } from "../../Storage/Redux/SavedPostSlice";
import toastNotify from "../../Taghelper/toastNotify";

const SavedPost: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);

  const {
    data: savedData,
    error,
    isLoading,
    
  } = useGetUserSavedPostsQuery(userId);

  const [removeSavedPost, { isLoading: isRemoving }] = useRemoveSavedPostMutation();

  const savedPosts = useSelector((state: Rootstate) => state.savedPostStore.savedPosts);

  useEffect(() => {
    if (savedData?.result) {
      dispatch(setSavedPosts(savedData.result));
    }
  }, [savedData, dispatch]);

  const handleRemovePost = async (postId: number) => {
    try {
      await removeSavedPost(postId).unwrap();
      dispatch(removeSavedPostFromRedux(postId));
      toastNotify("Post removed from saved list", "success");
    } catch (err) {
      toastNotify("Failed to remove post", "error");
      console.error("Failed to remove post:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading saved posts. Please try again later.</p>;
  if (savedPosts.length === 0) {
    return <p className="text-gray-500">No saved posts available.</p>;
  }

  return (
    <div className="saved-posts p-4">
      <h2 className="text-lg font-bold mb-4">Saved Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {savedPosts.map((savedPost) => (
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
              {Array.isArray(savedPost.imageUrls) && savedPost.imageUrls.length > 0 && (
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
                disabled={isRemoving}
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

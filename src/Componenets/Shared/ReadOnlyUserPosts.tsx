import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostByuserIdQuery } from "../../Apis/postApi";
import { PostModel } from "../../Interfaces/index"; // Assuming this is your PostModel

const ReadOnlyUserPosts: React.FC = () => {
  const { userid } = useParams();
  const navigate = useNavigate();

  const { data: response, isLoading, isError } = useGetPostByuserIdQuery(userid);

  const posts = response?.result;

  // Handle loading, error, and empty states
  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts. Please try again later.</p>;
  if (!posts || posts.length === 0) return <p>No posts available.</p>;



  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post: PostModel) => (
        <div
          key={post.postId}
          className="relative rounded-lg overflow-hidden shadow-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
        >
          {/* Display the first image of the post, or a placeholder if no image */}
          <img
            src={post.images?.[0]?.imageUrl || "https://via.placeholder.com/150"}
            alt="Post"
            className="w-full h-full object-cover"
          />
          {/* Overlay with post details */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-center h-full text-white">
              <span className="mr-2">💬 {post.commentCount}</span>
              <span>❤️ {post.likes?.length || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadOnlyUserPosts;

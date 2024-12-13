import React, { useEffect, useState } from 'react';
import { useGetAllPostsQuery } from '../../Apis/postApi';
import { PostModel } from '../../Interfaces';
import PostCreateComponent from './PostcreateComponent';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';

const Feed = () => {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const userName = useSelector((state: Rootstate) => state.userAuthStore.username);

  // States for pagination and storing posts
  const [page, setPage] = useState(1);
  const [postsList, setPostsList] = useState<PostModel[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch posts using RTK Query with pagination
  const { data, error, isLoading, isFetching } = useGetAllPostsQuery({ page, limit: 8 });
  console.log(data);

  // Append new posts to the list when `data` changes
  useEffect(() => {
    if (data?.result) {
      setPostsList((prevPosts) => [...prevPosts, ...data.result]);
      if (data.result.length < 8) setHasMore(false); // No more posts to load if fewer than 8 returned
    }
  }, [data]);

  // Loading and error handling
  if (isLoading && page === 1) {
    return <div className="text-center text-gray-500">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Failed to load posts. Please try again later.</div>;
  }

  // Handler for loading the next page
  const loadMorePosts = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="p-7 flex flex-col md:flex-row md:space-x-8 bg-white min-h-screen">
      <div className="flex-1 space-y-6">
        <PostCreateComponent />

        {/* Display Posts */}
        {postsList.length > 0 ? (
          postsList.map((post: PostModel) => (
            <div key={post.postId} className="animate-fadeIn">
              <PostCard post={post} userId={userId} userName={userName} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No posts available.</div>
        )}

        {/* Load More Button */}
        {hasMore && !isFetching && (
          <button
            onClick={loadMorePosts}
            className="mt-4 mx-auto block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More Posts
          </button>
        )}
        {!hasMore && (
          <div className="text-center mt-4 text-gray-500">No more posts to load</div>
        )}
        {isFetching && <div className="text-center mt-4">Loading more posts...</div>}
      </div>
    </div>
  );
};

export default Feed;

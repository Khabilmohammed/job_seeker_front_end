import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useGetAllPostsQuery } from '../../Apis/postApi';
import { PostModel } from '../../Interfaces';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import PostCreateComponent from './PostcreateComponent';

const Feed = () => {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const userName = useSelector((state: Rootstate) => state.userAuthStore.username);

  // States for pagination and storing posts
  const [page, setPage] = useState(1); 
  const [postsList, setPostsList] = useState<PostModel[]>([]); 
  const [hasMore, setHasMore] = useState(true); 

  // Fetch posts using RTK Query with pagination
  const { data, error, isLoading, isFetching, refetch } = useGetAllPostsQuery({ page, limit: 8 });

  useEffect(() => {
    if (data?.result) {
      setPostsList((prevPosts) => [...prevPosts, ...data.result]);
      if (data.result.length < 8) setHasMore(false); 
    }
  }, [data]);

  // Intersection Observer setup
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetching) return; // Avoid setting up the observer if data is being fetched
      if (observer.current) observer.current.disconnect(); 
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load the next page when the last post is visible
        }
      });
      if (node) observer.current.observe(node); // Observe the new last post
    },
    [isFetching, hasMore]
  );

  if (isLoading && page === 1) {
    return <div className="text-center text-gray-500">Loading posts...</div>;
  }

  // Handle API errors
  if (error) {
    return <div className="text-center text-red-500">Failed to load posts. Please try again later.</div>;
  }

  return (
    <div className="p-7 flex flex-col md:flex-row md:space-x-8 bg-white min-h-screen">
      <div className="flex-1 space-y-6">
        {/* Post creation component */}
        <PostCreateComponent
          onPostCreated={() => {
            setPage(1); 
            setPostsList([]); 
            refetch(); 
          }}
        />

        {/* Render the list of posts */}
        {postsList.length > 0 ? (
          postsList.map((post: PostModel, index) => {
            // Attach the observer to the last post
            if (index === postsList.length - 1) {
              return (
                <div key={post.postId} className="animate-fadeIn" ref={lastPostRef}>
                  <PostCard post={post} userId={userId} userName={userName} />
                </div>
              );
            } else {
              return (
                <div key={post.postId} className="animate-fadeIn">
                  <PostCard post={post} userId={userId} userName={userName} />
                </div>
              );
            }
          })
        ) : (
          <div className="text-center text-gray-500">No posts available.</div>
        )}

        {/* Loading more posts indicator */}
        {isFetching && <div className="text-center mt-4">Loading more posts...</div>}
        {!hasMore && (
          <div className="text-center mt-4 text-gray-500">No more posts to load</div>
        )}
      </div>
    </div>
  );
};

export default Feed;

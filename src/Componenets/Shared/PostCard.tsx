import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import { LikeModel, PostModel } from '../../Interfaces';
import { useCreateLikeMutation, useDeleteLikeMutation, useGetLikesForPostQuery } from '../../Apis/likeApi';
import LikesModal from '../Shared/LikesModel'; 
import CommentsModal from '../Shared/CommandModel';
import { useCreateCommentMutation, useGetCommentsForPostQuery } from '../../Apis/commentApi';
import { useSavePostMutation, useRemoveSavedPostMutation } from '../../Apis/savedPostApi'; // Import the API hooks
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';import { useSharePostMutation } from '../../Apis/shareApi';
import ShareModal from './ShareModal';
import toastNotify from '../../Taghelper/toastNotify';
interface PostCardProps {
  post: PostModel;
  userId: string;
  userName: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, userId, userName }) => {
  const userRole = useSelector((state: Rootstate) => state.userAuthStore.role);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likeCount || 0);
  const [isSaved, setIsSaved] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);
  const navigate = useNavigate();
  // Likes
  const { data: likesData } = useGetLikesForPostQuery(post.postId, { skip: !isModalOpen });
  const [createLike] = useCreateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  // Comments
  const { data: commentsData, isLoading: isCommentsLoading, error: commentsError } = useGetCommentsForPostQuery(post.postId, { skip: !isCommentsModalOpen });
  const [createComment] = useCreateCommentMutation();
  console.log(commentsData);
  // Save/Unsaved Post
  const [savePost] = useSavePostMutation();
  const [removeSavedPost] = useRemoveSavedPostMutation();

  const [comments, setComments] = useState<{ userName: string; content: string; timestamp: string; }[]>([]);

  //share post
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // Share modal state
  const [sharePost] = useSharePostMutation(); // Mutation for sharing posts
  useEffect(() => {
    if (commentsData?.result) {
        setComments(
            commentsData.result.comments.map((comment: any) => ({
                userName: comment.userName,
                content: comment.content,
                timestamp: comment.createdAt !== "0001-01-01T00:00:00"
                    ? comment.createdAt
                    : null,  // Handle unknown timestamp
            }))
        );
    }
}, [commentsData]);


  useEffect(() => {
    if (post.likes?.length) {
      setIsLiked(post.likes.some((like: LikeModel) => like.userId === userId));
    } else {
      setIsLiked(false);
    }
    setLikesCount(post.likeCount || 0);
  }, [post.likes, userId, post.likeCount]);



  const handleLike = async () => {
    try {
      if (isLiked) {
        await deleteLike({ postId: post.postId, userId }).unwrap();
        setIsLiked(false);
        setLikesCount((prev) => Math.max(prev - 1, 0));
      } else {
        await createLike({ postId: post.postId, userId }).unwrap();
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to update like:", error);
    }
  };

  const handleSavePost = async () => {
    try {
      if (isSaved) {
        await removeSavedPost(post.postId).unwrap();
        setIsSaved(false);
      } else {
        await savePost(post.postId).unwrap();
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Failed to update saved post:", error);
    }
  };
  const handleProfileClick = () => {
    if(userRole==='company'){
      if (post.userRole==='company') {
        navigate(`/company/getCompanyProfiePage/${post.userId}`); 
      } else {
        console.log(post.userRole);
        navigate(`/company/getUserProfilePage/${post.userId}`);
      } 
    }else{
      if (post.userRole==='company') {
        navigate(`/user/getCompanyProfiePage/${post.userId}`); 
      } else {
        console.log(post.userRole);
        navigate(`/user/getUserProfilePage/${post.userId}`);
      } 
    }
    
  };
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
        try {
            // Send only necessary data to backend
            await createComment({ postId: post.postId, userId, content: comment }).unwrap();
            // Locally add the comment with timestamp for display purposes
            const timestamp = new Date().toISOString();
            setComments((prev) => [
                ...prev,
                { userName, content: comment, timestamp },
            ]);
            setCommentCount((prev) => prev + 1);
            setComment(''); // Clear the input after submission
        } catch (error) {
            console.error("Failed to create comment:", error);
        }
    }
};

const handleShareClick = async (selectedUsers: any[]) => {
  const selectedUserIds = selectedUsers.map(user => user.userId);
  console.log("Selected users' IDs to share with:", selectedUserIds);
  
  try {
    await sharePost({
      postId: post.postId,
      SenderId: userId,
      RecipientId: selectedUserIds[0], // Pass only the userIds
    }).unwrap();
    toastNotify("You have shared the post","success");
    setIsShareModalOpen(false); // Close modal on success
  } catch (error) {
    console.error("Failed to share post:", error);
  }
};


  return (
    <div className='flex flex-col gap-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden max-w-lg mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-center p-2'>
        <div className='flex items-center gap-2'>
          <img
            src="https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User"
            className='w-8 h-8 rounded-full object-cover'
          />
          <span
  className="font-medium text-sm text-gray-800 gap-2 cursor-pointer hover:underline"
  onClick={handleProfileClick}
>
  {post.userName || "username"}
</span>
        </div>
        <IoIosMore className='w-5 h-5 text-gray-600 cursor-pointer' />
      </div>

      {/* Post Image with Swipe Functionality */}
      <Swiper
  spaceBetween={10}
  slidesPerView={1}
  loop
  pagination={{ clickable: true }}
  className="w-full h-auto"
>
  {post.images?.map((image, index) => (
    <SwiperSlide key={index}>
      <img
        src={image.imageUrl || "default-post-image.jpg"}
        alt={`Post Image ${index + 1}`}
        className="w-full h-auto object-cover rounded-md"
      />
    </SwiperSlide>
  ))}
</Swiper>


      {/* Actions */}
      <div className="flex justify-between items-center px-2 py-1">
        <div className='flex items-center gap-3'>
          <div onClick={handleLike} className='cursor-pointer'>
            {isLiked ? (
              <FaHeart className='w-5 h-5 text-red-500' />
            ) : (
              <FaRegHeart className='w-5 h-5 text-gray-700 hover:text-red-500 transition-colors' />
            )}
          </div>
          <FaRegComment
            className='w-5 h-5 text-gray-700 cursor-pointer hover:text-blue-500 transition-colors'
            onClick={() => setIsCommentsModalOpen(true)}
          />
          <FiSend
        className="w-4 h-4 text-gray-700 cursor-pointer hover:text-green-500 transition-colors"
        onClick={() => setIsShareModalOpen(true)}
      />
        </div>
        <div onClick={handleSavePost} className='cursor-pointer'>
          {isSaved ? (
            <FaBookmark className='w-5 h-5 text-blue-500' />
          ) : (
            <FaRegBookmark className='w-5 h-5 text-gray-700 hover:text-blue-500 transition-colors' />
          )}
        </div>
      </div>

      {/* Likes and Description */}
      <div className='px-2 pb-2'>
        <div className='flex items-center gap-2 mb-1' onClick={() => setIsModalOpen(true)}>
          <p className='text-xs text-gray-800 cursor-pointer'>
            Liked by <strong>{likesCount}</strong> others
          </p>
        </div>

        <p className='text-xs text-gray-800 mb-1'>
          <strong className='mr-1'>{post.userName || "username"}</strong>
          {post.content}
        </p>

        <span
          className='text-xs text-gray-500 cursor-pointer hover:underline'
          onClick={() => setIsCommentsModalOpen(true)}
        >
          View all {commentCount} comments
        </span>

        <p className='mt-1 text-xs text-gray-500 uppercase'>
          {new Date(post.createdAt).toLocaleString()}
        </p>

        <form className="flex items-center mt-2 mb-1 gap-3" onSubmit={handleCommentSubmit}>
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="text-blue-500 text-sm font-semibold hover:underline"
          >
            Post
          </button>
        </form>
      </div>

      {/* Modals */}
      <LikesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        likes={likesData?.result || []}
      />

<CommentsModal
        isOpen={isCommentsModalOpen}
        onClose={() => setIsCommentsModalOpen(false)}
        comments={comments}
        loading={isCommentsLoading}
        error={!!commentsError}
      />

<ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={handleShareClick} // Pass handleShareClick as prop
      />
    </div>
  );
};

export default PostCard;

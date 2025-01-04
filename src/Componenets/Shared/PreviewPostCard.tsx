import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { PostModel } from '../../Interfaces';

interface PreviewPostCardProps {
  post: PostModel;
  onClose: () => void;
}

const PreviewPostCard: React.FC<PreviewPostCardProps> = ({ post, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likeCount || 0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => Math.max(prev - 1, 0));
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const openImageViewer = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
    setIsImageViewerOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-4/5 max-w-3xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Post Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="p-4">
          {post.images && post.images.length > 0 ? (
            <Swiper spaceBetween={10} slidesPerView={1}>
              {post.images.map((image) => (
                <SwiperSlide key={image.imageUrl}>
                  <img
                    src={image.imageUrl}
                    alt="Post"
                    className="w-full h-64 object-cover rounded cursor-pointer"
                    onClick={() => openImageViewer(image.imageUrl)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-300">No Images</p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Posted on: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleLike}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
            >
              {isLiked ? <FaHeart className="mr-2" /> : <FaRegHeart className="mr-2" />}
              {likesCount} Likes
            </button>

            <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              <FaRegComment className="mr-2" />
              {post.commentCount} Comments
            </button>
          </div>
        </div>
      </div>

      {/* Full Image Viewer Modal */}
      {isImageViewerOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={closeImageViewer}
              className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPostCard;

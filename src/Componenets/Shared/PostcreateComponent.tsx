import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useCreatePostMutation } from '../../Apis/postApi';
import { Rootstate } from '../../Storage/Redux/store';
import toastNotify from '../../Taghelper/toastNotify';

interface FormData {
  content: string;
  images: FileList | null;
}

interface PostCreateComponentProps {
  onPostCreated: () => void;
}

const PostCreateComponent: React.FC<PostCreateComponentProps> = ({ onPostCreated }) => {
  const { register, handleSubmit, control, reset } = useForm<FormData>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Previews of selected images
  const [createPost, { isLoading, isError, error }] = useCreatePostMutation();
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);

  // Submit handler
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('userId', userId);

    // Append images to form data
    if (data.images) {
      Array.from(data.images).forEach((file) => {
        console.log("images",data.images)
        formData.append('Images', file);  // Using the 'Images' key to match backend
      });
    }
    try {
      const response = await createPost(formData).unwrap();
      toastNotify('Post created successfully', 'success'); // Success toast
      reset(); // Reset the form
      setImagePreviews([]); // Clear image previews
      onPostCreated(); // Notify parent to refetch posts
    } catch (error: any) {
      toastNotify(error.data.message, 'error'); // Show error toast
    }
  };

  // Cleanup image previews when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 transition-all hover:shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="What's on your mind?"
          rows={4}
          {...register('content', { required: true })}
        />

        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  const newImagePreviews = Array.from(files).map((file) =>
                    URL.createObjectURL(file)
                  );
                  setImagePreviews(newImagePreviews); // Preview images
                  field.onChange(files); // Pass files to react-hook-form
                }
              }}
              className="mb-4 w-full text-sm text-gray-500"
            />
          )}
        />

        {/* Image Previews */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {imagePreviews.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>

        <button
          type="submit"
          className={`bg-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all hover:bg-purple-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Posting...' : 'Post'}
        </button>

        {isError && (
          <div className="text-red-500 mt-2">
            {typeof error === 'string'
              ? error
              : 'Failed to create post. Please try again.'}
          </div>
        )}
      </form>
    </div>
  );
};

export default PostCreateComponent;

export interface SavedPostModel {
  savedPostId: number;  
  userId: string;       
  postId: number;
  userName: string;  
  post: {
    postId: number;
    userId: string;
    content: string;
    createdAt: string;
    images: { url: string }[];
    likeCount: number;
    commentCount: number;
    userName: string;
    email: string;
  } | null; 
}

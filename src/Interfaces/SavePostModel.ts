export interface SavedPostModel {
  userId: string;
  postId: number;
  userName: string;
  postContent: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  imageUrls: string[];
}
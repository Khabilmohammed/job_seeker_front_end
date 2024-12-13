import { LikeModel } from "./LikeModel";

export default interface PostModel {
  postId: number;
    userId: string;
    userName:string;
    content: string;
    images?: { postId: string; imageUrl: string }[]; 
    likeCount: number;
    commentCount: number;
    sharesCount: number;
    createdAt: string; 
    likes: LikeModel[];
    userRole:string;
  }
  
export interface LikeModel {
  likeId: number;       
  postId: number;       
  userId: string;        
  userName: string | null;  
}

export interface GetLikesForPostResponse {
  likes: LikeModel[]; 
}

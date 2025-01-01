export const POST_API_ENDPOINTS = {
    CREATE_POST: "post/CreatePost",
    GET_ALL_POSTS: "post/GetAllPosts",
    GET_POST_BY_ID: (postId: string | number) => `post/GetPost/${postId}`,
    GET_POSTS_BY_USER: (userId: string | number) => `post/GetPostsByUser/${userId}`,
    UPDATE_POST: (postId: string | number) => `post/UpdatePost/${postId}`,
    DELETE_POST: (postId: string | number) => `post/DeletePost/${postId}`,
  };
  
 //authApi
export const AUTH_API_ENDPOINTS = {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    VALIDATE_OTP: "auth/validate-otp",
    LOGOUT: "auth/logout",
    FORGOT_PASSWORD: "auth/forgot-password",
    RESEND_OTP: "auth/registration-resend-otp",
    RESET_PASSWORD: "auth/reset-password",
    REFRESH_TOKEN: "auth/refresh-token",
  };
  
//certificateApi
export const CERTIFICATE_API_ENDPOINTS = {
    GET_BY_ID: "/Certificate",
    GET_BY_USER: "/Certificate/user",
    CREATE: "/Certificate",
    DELETE: "/Certificate",
  };

//commentApi
export const COMMENT_API_ENDPOINTS = {
    GET_COMMENTS_BY_POST: "comment/GetCommentsByPost",
    CREATE_COMMENT: "comment/CreateComment",
    DELETE_COMMENT: "comment/DeleteComment",
  };

  //companyApi
export  const COMPANY_API_ENDPOINTS = {
    GET_COMPANY_BY_ID: "Company",
    GET_COMPANY_BY_USER_ID: "Company/user",
    CREATE_COMPANY: "Company/create",
    UPDATE_COMPANY: "Company",
    DELETE_COMPANY: "Company", 
  };

  //dashboardApi
 export const DASHBOARD_API_ENDPOINTS = {
    STATS: "Dashboard/stats",
    MONTHLY_STATS: "Dashboard/monthly-stats",
    ENGAGEMENT_METRICS: "Dashboard/engagement-metrics",
  };

  //educationApi
 export const EDUCATION_API_ENDPOINTS = {
    GET_BY_ID: (id: string) => `Education/${id}`,
    GET_BY_USER: (userId: string) => `Education/user/${userId}`,
    CREATE: "Education/create",
    UPDATE: (id: string) => `Education/${id}`,
    DELETE: (id: string) => `Education/${id}`,
  };

  //experienceApi
export const EXPERIENCE_API_ENDPOINTS = {
    BASE: "experience",
    BY_ID: (id: string) => `experience/${id}`,
  };

  //followApi
 export const FOLLOW_API_ENDPOINTS = {
    FOLLOW: "Follow/follow",
    UNFOLLOW: "Follow/unfollow",
    FOLLOWERS: (userId: string) => `Follow/${userId}/followers`,
    FOLLOWING: (userId: string) => `Follow/${userId}/following`,
    FOLLOW_STATUS: (followerId: string, followingId: string) => `Follow/${followerId}/${followingId}/status`,
    PEOPLE_YOU_MAY_KNOW: (userId: string) => `Follow/${userId}/people-you-may-know`,
  };

  //jobapplicationApi
 export const JOB_APPLICATION_API_ENDPOINTS = {
    APPLY: "JobApplication/Apply",
    GET_BY_ID: (jobApplicationId: string) => `JobApplication/${jobApplicationId}`,
    GET_BY_JOB_POSTING: (jobPostingId: string) => `JobApplication/ByJobPosting/${jobPostingId}`,
    GET_BY_USER: (userId: string) => `JobApplication/ByUser/${userId}`,
    CHANGE_STATUS: (jobApplicationId: string) => `JobApplication/ChangeStatus/${jobApplicationId}`,
    REMOVE: (jobApplicationId: string) => `${jobApplicationId}`,
  };

  //jobPostingApi
export const JOB_POSTING_API_ENDPOINTS = {
    CREATE: "JobPosting/create",
    GET_ALL: "JobPosting/all",
    GET_ALL_ADMIN: "JobPosting/all-job-admin",
    GET_BY_ID: (jobId: string) => `JobPosting/${jobId}`,
    GET_BY_COMPANY: (companyId: string) => `JobPosting/company/${companyId}`,
    UPDATE: (jobId: string) => `JobPosting/${jobId}/update`,
    DELETE: (jobId: string) => `JobPosting/${jobId}/delete`,
  };

//likeApi
export const LIKE_API_ENDPOINTS = {
    GET_LIKES_FOR_POST: (postId: string) => `like/GetLikesForPost/${postId}`,
    CREATE_LIKE: "like/AddLike",
    GET_LIKES_COUNT_FOR_POST: (postId: string) => `like/GetLikesCountForPost/${postId}`,
    DELETE_LIKE: "like/RemoveLike",
  };
  
//paymentApi
export const PAYMENT_API_ENDPOINTS = {
    INITIAL_PAYMENT: "payment/makepayment",
  };

  //savedPostApi
export const SAVED_POST_API_ENDPOINTS = {
    GET_USER_SAVED_POSTS: (userId: string) => `savedpost/${userId}`,
    SAVE_POST: (postId: number) => `savedpost/${postId}`,
    REMOVE_SAVED_POST: (postId: number) => `savedpost/${postId}`,
  };
  
//searchApi
export const SEARCH_API_ENDPOINTS = {
    SEARCH_JOB_POSTS: (query: string) => `Search/job-posts?query=${encodeURIComponent(query)}`,
  };
  
//storyApi
 export const STORY_API_ENDPOINTS = {
    GET_STORIES_BY_USER_ID: (userId: string) => `stories/user/${userId}`,
    GET_ARCHIVED_STORIES: (userId: string) => `stories/archived?userId=${userId}`,
    GET_STORIES_FROM_OTHERS: (userId: string) => `stories/otherstories/${userId}`,
    CREATE_STORY: "stories/create",
    DELETE_STORY: (storyId: string) => `stories/${storyId}`,
  };
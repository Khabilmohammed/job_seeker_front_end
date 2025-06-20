export interface Story {
  storyId: number; // Ensure you have the right properties
  userId: string;
  createdAt: string; // Check this type too
  isActive: boolean;  // Adjust types based on your API response
  userName: string;   // Make sure this matches your API data
  imageUrl: string; 
  }
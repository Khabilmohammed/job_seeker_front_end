export default interface ApiResponse {
    data?: {
      statusCode?: number;
      isSuccess?: boolean;
      errorMessages?: Array<string>;
      result: {
        statusCode: number; // Assuming this is always present
        isSuccess: boolean; // Assuming this is always present
        errorMessages: Array<string>;
        result: {
          id: string;
          username: string;
          email: string;
          token: string;
          expiration: string;
        };
      };
    };
    error?: any;
  }
  
export interface Message {
    messageId: number;
    senderId: string;
    senderUserName: string;
    recipientId: string;
    recipientUserName: string;
    content: string;
    dateRead?: Date;
    sentAt: Date;
  }
  
  export interface CreateMessageDTO {
    recipientUserName: string;
    content: string;
  }

  export interface MessageParams {
    container: 'Inbox' | 'Outbox' | 'Unread';
    username: string;
  }
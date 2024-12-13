import React from "react";
import { Message } from "../../Interfaces/MessageModel";

interface MessageThreadProps {
  selectedUser: string;
  messages: Message[];
}

const MessageThread: React.FC<MessageThreadProps> = ({ selectedUser, messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={message.messageId}
          className={`flex ${message.senderId === selectedUser ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg text-white ${
              message.senderId === selectedUser ? "bg-gray-200 text-black" : "bg-blue-500"
            }`}
          >
            {message.content}
          </div>
          <div className="text-xs text-gray-500 ml-2">{new Date(message.sentAt).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageThread;

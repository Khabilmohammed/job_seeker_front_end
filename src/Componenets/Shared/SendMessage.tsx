import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Message } from "../../Interfaces/MessageModel";

interface SendMessageProps {
  recipientId: string;
  onSendMessage: (message: Message) => void;
}

const SendMessage: React.FC<SendMessageProps> = ({ recipientId, onSendMessage }) => {
  const [content, setContent] = useState("");

  const handleSendMessage = () => {
    if (content.trim()) {
      const newMessage: Message = {
        messageId: Date.now(),
        senderId: "self", // Replace with actual user ID
        senderUserName: "You",
        recipientId,
        recipientUserName: recipientId, // Replace with actual username
        content,
        sentAt: new Date(),
      };
      onSendMessage(newMessage);
      setContent("");
    }
  };

  return (
    <div className="p-4 border-t flex items-center">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message"
        className="w-full p-3 rounded-lg border bg-gray-100 focus:outline-none"
      />
      <button onClick={handleSendMessage} className="ml-2 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600">
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default SendMessage;

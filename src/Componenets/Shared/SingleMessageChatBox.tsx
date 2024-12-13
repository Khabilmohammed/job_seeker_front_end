import React, { useState, useEffect } from 'react';
import {  HubConnection } from '@microsoft/signalr';
import { messageHubService } from '../../Apis/signalrConnection/messageHubService';

interface ChatBoxProps {
  selectedUser: {
    userName: string;
    fullName: string;
    profilePicture: string;
  } | null;
  currentUserToken: string;
  onClose: () => void;
}

interface Message {
  senderUserName: string;
  content: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ selectedUser, currentUserToken, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    if (selectedUser?.userName && currentUserToken) {
        console.log('currentUserToken',currentUserToken)
      const connect = async () => {
        const connection = messageHubService(selectedUser.userName);
  
        connection.on("ReceiveMessageThread", (fetchedMessages: Message[]) => {
          setMessages(fetchedMessages);
        });
  
        connection.on("ReceiveMessage", (newMessage: Message) => {
          setMessages((prev) => [...prev, newMessage]);
        });
  
        try {
          await connection.start();
          setConnection(connection);
        } catch (err) {
          console.error("Message Connection Error: ", err);
        }
      };
  
      connect();
  
      return () => {
        connection?.stop();
      };
    }
  }, [selectedUser, currentUserToken]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && connection && selectedUser) {
      const messageDTO = {
        recipientUserName: selectedUser.userName,
        content: newMessage,
      };

      try {
        await connection.invoke('SendMessage', messageDTO);
        setNewMessage('');
      } catch (error) {
        console.error('SendMessage Error:', error);
      }
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="fixed bottom-0 right-4 bg-white shadow-lg w-96 rounded-t-lg z-10">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={selectedUser.profilePicture}
            alt={selectedUser.fullName}
          />
          <span className="ml-2 font-semibold">{selectedUser.fullName}</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          ✕
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <div className="text-sm text-gray-600">
              {msg.senderUserName === selectedUser?.userName ? 'You' : msg.senderUserName}
            </div>
            <p className="bg-gray-100 p-2 rounded">{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaTrash, FaUserCircle } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";
import { Message } from "../../Interfaces/MessageModel";
import { messageHubService } from "../../Apis/signalrConnection/messageHubService";

interface User {
  userName: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Props {
  selectedUser: User | null;
  messages: Message[]; // Parent-passed messages
  isLoading: boolean;
  currentUserToken: string;
  onDeleteMessage: (messageId: number) => void;
}

const ChatWindow: React.FC<Props> = ({
  selectedUser,
  messages,
  currentUserToken,
  isLoading,
  onDeleteMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState<any>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);

  // Sync parent messages → local state
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // Connect to SignalR
  useEffect(() => {
    if (selectedUser?.userName && currentUserToken) {
      const connect = async () => {
        const connection = messageHubService(selectedUser.userName);

        connection.on("ReceiveMessage", (newMsg: Message) => {
          setLocalMessages((prev) => [...prev, newMsg]);
        });

        connection.on("MessageDeleted", (messageId: number) => {
          setLocalMessages((prev) =>
            prev.filter((msg) => msg.messageId !== messageId)
          );
        });

        try {
          await connection.start();
          setConnection(connection);
        } catch (err) {
          console.error("SignalR Connection Error: ", err);
        }
      };

      connect();

      return () => {
        connection?.stop();
      };
    }
  }, [selectedUser, currentUserToken]);

  const handleDeleteMessage = (messageId: number) => {
    setShowModal(true);
    setMessageToDelete(messageId);
  };

  const confirmDeleteMessage = async () => {
    if (connection && messageToDelete !== null) {
      try {
        await connection.invoke("DeleteMessage", messageToDelete);
      } catch (err) {
        console.error("DeleteMessage Error: ", err);
      }
    }
    setShowModal(false);
    setMessageToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setMessageToDelete(null);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && connection && selectedUser) {
      const messageDTO = {
        recipientUserName: selectedUser.userName,
        content: newMessage,
      };
      try {
        await connection.invoke("SendMessage", messageDTO);
        setNewMessage("");
      } catch (err) {
        console.error("SendMessage Error: ", err);
      }
    }
  };

  return (
    <div className="flex-1 bg-white flex flex-col">
      {selectedUser && (
        <>
          <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
            <div className="flex items-center">
              {selectedUser.profilePicture ? (
                <img
                  src={selectedUser.profilePicture}
                  alt={selectedUser.userName}
                  className="w-12 h-12 rounded-full mr-4"
                />
              ) : (
                <FaUserCircle className="w-12 h-12 text-gray-500 mr-4" />
              )}
              <div>
                <div className="font-semibold text-lg">
                  {selectedUser.userName}
                </div>
                <div className="text-sm text-gray-500">Online</div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <p>Loading messages...</p>
            ) : (
              localMessages.map((message) => (
                <div
                  key={message.messageId}
                  className={`flex ${
                    message.senderUserName === selectedUser.userName
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-white ${
                      message.senderUserName === selectedUser.userName
                        ? "bg-gray-500 text-black"
                        : "bg-blue-500"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 ml-2">
                    {new Date(message.sentAt).toLocaleTimeString()}
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(message.messageId)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="w-full p-3 rounded-lg border bg-gray-100 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <FaPaperPlane />
            </button>
          </div>
        </>
      )}

      <ConfirmationModal
        show={showModal}
        message="Are you sure you want to delete this message?"
        title="Delete Confirmation"
        onConfirm={confirmDeleteMessage}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ChatWindow;

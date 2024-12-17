import { useState, useEffect } from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
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
  messages: Message[];
  isLoading: boolean;
  currentUserToken: string;
  onDeleteMessage: (messageId: number) => void;
}

const ChatWindow: React.FC<Props> = ({
  selectedUser,
  messages: initialMessages,
  currentUserToken,
  isLoading,
  onDeleteMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    if (selectedUser?.userName && currentUserToken) {
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
          console.error("SignalR Connection Error: ", err);
        }
      };
  
      connect();
  
      return () => {
        connection?.stop();
      };
    }
  }, [selectedUser, currentUserToken]);

  useEffect(() => {
    if (connection) {
        connection.on("NewMessage", (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });
    }
    return () => {
        connection?.off("NewMessage");
    };
}, [connection]);
useEffect(() => {
  if (connection) {
    connection.on("MessageDeleted", (messageId: number) => {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.messageId !== messageId)
      );
    });
  }
  return () => {
    connection?.off("MessageDeleted");
  };
}, [connection]);

const handleDeleteMessage = async (messageId: number) => {
  if (connection) {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      await connection.invoke("DeleteMessage", messageId);
      console.log(`Message with ID ${messageId} deleted successfully.`);
    } catch (err) {
      console.error("DeleteMessage Error: ", err);
    }
  }
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
              <img
                src={selectedUser.profilePicture}
                alt={selectedUser.userName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold text-lg">{selectedUser.userName}</div>
                <div className="text-sm text-gray-500">Online</div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <p>Loading messages...</p>
            ) : (
              messages.map((message) => (
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
    </div>
  );
};

export default ChatWindow;

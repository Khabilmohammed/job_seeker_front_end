import { useEffect, useState } from "react";
import {
  useGetMessageThreadQuery,
  useDeleteMessageMutation,
  useGetChattedUsersQuery,
  useCreateMessageMutation,
} from "../../Apis/messageApi";
import { Message } from "../../Interfaces/MessageModel";
import ChattedUsersSidebar from "../../Componenets/Shared/ChattedUsersSidebar";
import ChatWindow from "../../Componenets/Shared/ChatWindow";


interface User {
  userName: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const MessagePage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const token=localStorage.getItem('token') || ''
  const { data: chattedUsers = [], isLoading: isLoadingUsers, error: usersError } =
    useGetChattedUsersQuery({});
  console.log("chattedUsers",chattedUsers);
  const { data: fetchedMessages, isLoading: isLoadingMessages } =
    useGetMessageThreadQuery(selectedUser?.userName || "", {
      skip: !selectedUser,
    });

  const [deleteMessage] = useDeleteMessageMutation();
  //const [createMessage] = useCreateMessageMutation();

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  // const handleSendMessage = async (messageContent: string) => {
  //   if (selectedUser) {
  //     const newMessage = {
  //       messageId: Math.random(), // Temporary ID until backend confirms
  //       content: messageContent,
  //       senderUserName: "currentUserName", // Replace with the actual sender's username
  //       recipientUserName: selectedUser.userName,
  //       sentAt: new Date().toISOString(),
  //     };
  
  //     try {
  //       await createMessage(newMessage); // Send to backend
  //       setMessages((prevMessages:any) => [...prevMessages, newMessage]); // Update state
  //     } catch (err) {
  //       console.error("Failed to send message:", err);
  //     }
  //   }
  // };

  const handleDeleteMessage = async (messageId: number) => {
    await deleteMessage(messageId).unwrap();
    setMessages((prev) => prev.filter((msg) => msg.messageId !== messageId));
  };

  return (
    <div className="flex flex-col h-[87vh] bg-gradient-to-br from-gray-500 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-semibold text-gray-800">Messages</h1>
      </header>
    <div className="flex h-screen bg-gray-50">
      <ChattedUsersSidebar
        users={chattedUsers}
        isLoading={isLoadingUsers}
        error={usersError}
        onSelectUser={setSelectedUser}
      />
      <ChatWindow
      currentUserToken={token}
        selectedUser={selectedUser}
        messages={messages}
        isLoading={isLoadingMessages}
        onDeleteMessage={handleDeleteMessage}
      />
    </div>
    </div>
  );
};

export default MessagePage;

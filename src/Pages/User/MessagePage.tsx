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

 
  const handleDeleteMessage = async (messageId: number) => {
    await deleteMessage(messageId).unwrap();
    setMessages((prev) => prev.filter((msg) => msg.messageId !== messageId));
  };

  return (
    <>
   <h1 className="text-4xl font-extrabold text-gray-800">Messages</h1>
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
    </>
    
  );
};

export default MessagePage;

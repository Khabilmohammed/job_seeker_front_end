import { FaSearch, FaUserCircle } from "react-icons/fa";

interface User {
  userName: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Props {
  users: User[];
  isLoading: boolean;
  error: any;
  onSelectUser: (user: User) => void;
}

const ChattedUsersSidebar: React.FC<Props> = ({ users, isLoading, error, onSelectUser }) => {
  return (
    <div className="w-80 bg-green-50 border-r shadow-lg">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 rounded-full bg-gray-100 focus:outline-none"
          />
        </div>
        <ul>
          {isLoading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p>Error loading users</p>
          ) : (
            users.map((user) => (
              <li
                key={user.userName}
                onClick={() => onSelectUser(user)}
                className="flex items-center p-4 cursor-pointer hover:bg-gray-200 rounded-lg"
              >
               {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.userName}
            className="w-12 h-12 rounded-full mr-4"
          />
        ) : (
          <FaUserCircle className="w-12 h-12 text-gray-500 mr-4" />
        )}
                <div>
                  <div className="font-semibold text-lg">{user.userName}</div>
                  <div className="text-sm text-gray-600">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChattedUsersSidebar;

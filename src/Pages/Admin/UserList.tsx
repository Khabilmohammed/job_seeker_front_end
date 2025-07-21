import UserManagement from './UserManagement';
import { SD_Roles } from '../../Utility/SD';

const UserList = () => {
  return <UserManagement filterRole={"user"} title="Job Seeker Management" />;
};

export default UserList;

import UserManagement from './UserManagement';
import { SD_Roles } from '../../Utility/SD';

const CompanyList = () => {
  return <UserManagement filterRole={"company"} title="Company Management" />;
};

export default CompanyList;

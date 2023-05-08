import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center self-">
      <h1>HRnet</h1>
      <Link to="">View Current Employees</Link>
      <h2>Create Employee</h2>
    </div>
  );
};

export default Navbar;

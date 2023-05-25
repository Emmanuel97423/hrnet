import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-col justify-between items-center">
      <h1>HRnet</h1>
      <Link to="/employees" className="my-2">
        View Current Employees
      </Link>
      <h2>Create Employee</h2>
    </div>
  );
};

export default Navbar;

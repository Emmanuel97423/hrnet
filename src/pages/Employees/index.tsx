import { useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormContext } from '@/context/FormContext';
import Table2 from '@/components/ui/Table2';

/**
 * Employees component.
 * Lists all the employees in a table format.
 *
 * @component
 * return <Employees />
 */

const Employees: React.FC = () => {
  // Using FormContext to access the employees state
  const { employees } = useContext(FormContext);

  // useMemo used for performance optimization. Recomputes columns when employees change
  const columns = useMemo(
    () => [
      {
        Header: 'Firstname',
        accessor: 'firstname'
      },
      {
        Header: 'Lastname',
        accessor: 'lastname'
      },
      {
        Header: 'Birthday',
        accessor: 'birthday'
      },
      {
        Header: 'Start',
        accessor: 'start'
      },
      {
        Header: 'Street',
        accessor: 'street'
      },
      {
        Header: 'City',
        accessor: 'city'
      },
      {
        Header: 'State',
        accessor: 'state'
      },
      {
        Header: 'Zipcode',
        accessor: 'zipcode'
      },
      {
        Header: 'Department',
        accessor: 'department'
      }
    ],
    [employees]
  );

  return (
    <div className="w-screen  flex flex-col justify-start gap-8 items-center p-8">
      <h1>Current Employees</h1>
      <Table2 columns={columns} data={employees} />

      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};
export default Employees;

import { useMemo, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';
import Table from '@/components/ui/Table';

const Employees: React.FC = () => {
  const [storedValue] = useLocalStorage();

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
    [storedValue]
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const fetchIdRef = useRef(0);

  /* @ts-ignore */

  const fetchData = useCallback(
    /* @ts-ignore */
    ({ pageSize, pageIndex }) => {
      // This will get called when the table needs new data
      // You could fetch your data from literally anywhere,
      // even a server. But for this example, we'll just fake it.

      // Give this fetch an ID
      const fetchId = ++fetchIdRef.current;

      // Set the loading state
      setLoading(true);
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        /* @ts-ignore */

        setData(storedValue.slice(startRow, endRow));

        setPageCount(Math.ceil(storedValue.length / pageSize));

        setLoading(false);
      }
    },
    [storedValue]
  );

  return (
    <div className="w-screen  flex flex-col justify-start gap-8 items-center p-8">
      <h1>Current Employees</h1>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        page={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};
export default Employees;

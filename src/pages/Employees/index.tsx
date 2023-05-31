import {
  useMemo,
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect
} from 'react';
import { Link } from 'react-router-dom';
import { FormContext } from '@/context/FormContext';
import Table from '@/components/ui/Table';
import Table2 from '@/components/ui/Table2';

const Employees: React.FC = () => {
  const { employees } = useContext(FormContext);

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
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageIndexState, setPageIndexState] = useState<number>(0);
  const fetchIdRef = useRef(0);

  /* @ts-ignore */

  const data = useMemo(() => {
    employees;
  }, []);

  // const fetchData = useCallback(
  //   /* @ts-ignore */
  //   ({ pageSize, pageIndex }) => {
  //     console.log('pageIndex:', pageIndex);
  //     console.log('pageIndexState:', pageIndexState);

  //     setPageIndexState(pageIndex);
  //     // This will get called when the table needs new data
  //     // You could fetch your data from literally anywhere,
  //     // even a server. But for this example, we'll just fake it.

  //     // Give this fetch an ID
  //     const fetchId = ++fetchIdRef.current;
  //     console.log('fetchId:', fetchId);

  //     // Set the loading state
  //     setLoading(true);
  //     if (fetchId === fetchIdRef.current) {
  //       const startRow = pageSize * pageIndex;
  //       console.log('startRow:', startRow);
  //       const endRow = startRow + pageSize;
  //       console.log('endRow:', endRow);
  //       /* @ts-ignore */
  //       setData(employees.slice(startRow, endRow));

  //       setPageCount(Math.ceil(employees.length / pageSize));

  //       setLoading(false);
  //     }
  //   },
  //   []
  // );

  // const dataTest = useMemo(() => {
  //   return data;
  // }, [fetchData]);

  return (
    <div className="w-screen  flex flex-col justify-start gap-8 items-center p-8">
      <h1>Current Employees</h1>
      <Table2 columns={columns} data={employees} />
      {/* <Table
        columns={columns}
        data={employees}
        // fetchData={fetchData}
        // loading={loading}
        // pageCount={pageCount}
        // page={function (): void {
        //   throw new Error('Function not implemented.');
        // }}
        employees={[]}
      /> */}
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};
export default Employees;

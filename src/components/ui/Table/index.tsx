import { useEffect, useContext } from 'react';
import { useTable, Column, useSortBy, usePagination } from 'react-table';
import Input from '@/components/ui/Input';
import formContext from '@/context/FormContext';
import type { Employee } from '@/types/employee';

interface TableProps {
  columns: Column[];
  data: Employee[];
  fetchData: (props: { pageIndex: number; pageSize: number }) => void;
  loading: boolean;
  pageCount: number;
  page: () => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  fetchData,
  loading,

  pageCount: controlledPageCount
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    setPageSize,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy },
    toggleSortBy
  } = useTable(
    {
      columns,
      data,

      initialState: {
        pageIndex: 0,
        /* @ts-ignore */

        sortBy: [{ id: columns[0].accessor, desc: true }]
      },
      // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount
    },

    useSortBy,

    usePagination
  );
  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const handleSort = (column: any) => {
    const isColumnSorted = sortBy[0]?.id === column.id;
    toggleSortBy(column.id, isColumnSorted ? !sortBy[0]?.desc : true);
  };
  return (
    <div>
      <div className="w-full flex justify-between my-3">
        <div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="p-2 mr-2"
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>

        <Input type="search" label="Search" />
      </div>
      <table {...getTableProps()} style={{ border: ' ' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    // borderBottom: 'solid 3px red',
                    // background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold'
                  }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex justify-between items-center p-2">
                    <span>{column.render('Header')}</span>
                    <span className="flex flex-col mx-1">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        className={` ${
                          column.isSorted
                            ? column.isSortedDesc
                              ? 'transform rotate-180'
                              : ''
                            : 'opacity-20 '
                        }`}
                      >
                        <path d="M11.646 15.146L5.854 9.354a.5.5 0 01.353-.854h11.586a.5.5 0 01.353.854l-5.793 5.792a.5.5 0 01-.707 0z" />
                      </svg>
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="w-full border-black border-t-2"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="border-b-2" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px'
                        // border: 'solid 1px gray'
                        // background: 'papayawhip'
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex justify-between border-black border-t-2  py-3">
        <div className="flex-1 flex justify-start">
          {loading ? (
            // Use our custom loading state to show a loading indicator
            <span>Loading...</span>
          ) : (
            <span className="py-2 ">
              Showing {pageIndex + 1} to {page.length} of {pageSize} entries
            </span>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
        <div className="flex-1 flex justify-end">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default Table;

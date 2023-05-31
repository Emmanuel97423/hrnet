import { useTable, usePagination, Column, useSortBy } from 'react-table';
import Input from '@/components/ui/Input';
import type { Employee } from '@/types/employee';

interface TableProps {
  columns: Column[];
  data: Employee[];
}

const Table2: React.FC<TableProps> = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
    toggleSortBy
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        // @ts-ignore
        sortBy: [{ id: columns[0].accessor, desc: true }]
      }
    },
    useSortBy,
    usePagination
  );

  const handleSort = (column: any) => {
    const isColumnSorted = sortBy[0]?.id === column.id;
    toggleSortBy(column.id, isColumnSorted ? !sortBy[0]?.desc : true);
  };

  // Render the UI for your table
  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage
            },
            null,
            2
          )}
        </code>
      </pre>
      <div className="w-full flex justify-between my-3">
        <div className="w-full">
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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b-2">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px'
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
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="w-full flex justify-between border-black border-t-2  py-3">
        <div className="flex-1 flex justify-start">
          <span className="py-2 ">
            Showing {pageIndex + 1} to {page.length} of {pageSize} entries
          </span>
          {/* {loading ? (
            // Use our custom loading state to show a loading indicator
            <span>Loading...</span>
          ) : (
            <span className="py-2 ">
              Showing {pageIndex + 1} to {page.length} of {pageSize} entries
            </span>
          )} */}
        </div>
        <div className="flex-1 flex justify-center">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
        <div className="flex-1 flex justify-end gap-2">
          <button
            className="w-2.5 h-2.5 bg-black text-white   flex justify-center items-center p-4"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {'<'}
          </button>{' '}
          <button className="w-2.5 h-2.5 bg-cyan-600 p-4 flex justify-center items-center">
            {pageIndex + 1}
          </button>
          <button
            className="w-2.5 h-2.5 bg-black text-white   flex justify-center items-center p-4"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {'>'}
          </button>{' '}
        </div>
      </div>
    </>
  );
};

export default Table2;

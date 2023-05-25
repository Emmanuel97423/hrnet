import { useMemo, useEffect } from 'react';
import { useTable, Column, useSortBy, usePagination } from 'react-table';
import type { Employee } from '@/types/employee';

const Table: React.FC = ({
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
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy },
    toggleSortBy
  } = useTable<Employee>(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
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

  const handleSort = (column: Column<Employee>) => {
    const isColumnSorted = sortBy[0]?.id === column.id;
    toggleSortBy(column.id, isColumnSorted ? !sortBy[0]?.desc : true);
  };
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
      <div>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <span>entries</span>
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
        <tbody {...getTableBodyProps()} className="border-black border-y-2">
          {rows.map((row) => {
            console.log('row:', row);
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
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td>Loading...</td>
            ) : (
              <td className="py-2">
                Showing {pageIndex + 1} to {page.length} of {pageSize} entries
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
    </>
  );
};

export default Table;

/**
 * @module Table2
 * @category Components
 */

import { useState, useMemo } from 'react';
import 'regenerator-runtime/runtime';
import { matchSorter } from 'match-sorter';
import {
  useTable,
  usePagination,
  Column,
  useSortBy,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  Row,
  ColumnInstance
} from 'react-table';
import type { Employee } from '@/types/employee';
import { memo } from 'react';

interface TableProps {
  columns: Column<any>[];
  data: Employee[];
}

interface GlobalFilterProps {
  preGlobalFilteredRows: Array<Row<any>>;
  globalFilter: any;
  setGlobalFilter: (value: any) => void;
}

interface DefaultColumnFilterProps {
  column: ColumnInstance<any>;
}

/**
 * Default UI for global filtering
 *
 * @component
 * @param {GlobalFilterProps} props - Properties
 * @param {Array<Row<any>>} props.preGlobalFilteredRows - Rows before global filtering
 * @param {any} props.globalFilter - Current global filter value
 * @param {(value: any) => void} props.setGlobalFilter - Function to set global filter value
 *
 * @returns {JSX.Element} GlobalFilter component JSX
 */

// Define a default UI for filtering
const GlobalFilter: React.FC<GlobalFilterProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="flex items-center">
      {'Search:'}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        className="p-2 border-2 border-black ml-2"
      />
    </span>
  );
};

/**
 * Default UI for column filtering
 *
 * @component
 * @param {DefaultColumnFilterProps} props - Properties
 * @param {ColumnInstance<any>} props.column - Column instance for filtering
 *
 * @returns {JSX.Element} DefaultColumnFilter component JSX
 */

const DefaultColumnFilter: React.FC<DefaultColumnFilterProps> = ({
  column: { filterValue, preFilteredRows, setFilter }
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const fuzzyTextFilterFn = (
  rows: Array<Row<any>>,
  id: string,
  filterValue: string
): Array<Row<any>> => {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
};
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: string) => !val;

/**
 * Table component with filters and pagination
 *
 * @component
 * @param {TableProps} props - Table properties
 * @param {Column<any>[]} props.columns - Columns of the table
 * @param {Employee[]} props.data - Data for the table
 *
 * @returns {JSX.Element} Table component JSX
 */

const Table2: React.FC<TableProps> = ({ columns, data }) => {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: Array<Row<any>>, id: string, filterValue: string) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
    preGlobalFilteredRows,
    setGlobalFilter,
    toggleSortBy
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // @ts-ignore

      filterTypes,
      initialState: {
        pageIndex: 0,
        // @ts-ignore
        sortBy: [{ id: columns[0].accessor, desc: true }]
      }
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );

  const handleSort = (column: any) => {
    const isColumnSorted = sortBy[0]?.id === column.id;
    toggleSortBy(column.id, isColumnSorted ? !sortBy[0]?.desc : true);
  };

  let EmployeeExcerpt: React.FC = () => {
    return (
      <tbody
        {...getTableBodyProps()}
        className="w-full border-black border-t-2"
      >
        {page.map((row) => {
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
    );
  };

  EmployeeExcerpt = memo(EmployeeExcerpt);

  let tableContent;
  if (data.length > 0) {
    tableContent = <EmployeeExcerpt />;
  } else {
    tableContent = <div className=" p-6 ">No data available in table</div>;
  }

  // Render the UI for your table
  return (
    <div>
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

        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
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
        <>{tableContent}</>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="w-full flex justify-between border-black border-t-2  py-3">
        <div className="flex-1 flex justify-start">
          <span className="py-2 ">
            Showing {page.length} to {data.length} of {pageSize} entries
          </span>
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
          <div className="w-2.5 h-2.5 bg-cyan-600 p-4 flex justify-center items-center">
            {pageIndex + 1}
          </div>
          <button
            className="w-2.5 h-2.5 bg-black text-white   flex justify-center items-center p-4"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {'>'}
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default Table2;

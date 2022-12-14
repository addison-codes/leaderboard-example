import { useState, useMemo, useEffect } from 'react'
import useSWR from 'swr'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
  getPaginationRowModel,
  onChangeFn,
} from '@tanstack/react-table'

const Table = ({ range }) => {
  const [sorting, setSorting] = useState([])
  const [queryParams, setQueryParams] = useState('')

  const fetcher = (url, queryParams = '?limit=100') =>
    fetch(`${url}${queryParams}`).then((res) => res.json())
  const { data, error, mutate } = useSWR(
    ['/api/leaderboard', queryParams],
    fetcher
  )
  useEffect(() => {
    if (range == 'global') {
      setQueryParams('')
    }
  }, [])

  const columns = useMemo(() => [
    {
      accessorKey: 'rank',
      header: () => 'Rank',
      cell: (info) => info.renderValue(),
    },
    {
      accessorKey: 'name',
      header: () => 'Gamer Name',
      cell: (info) => info.renderValue(),
    },
    {
      accessorKey: 'pic',
      header: () => 'Avatar',
      cell: (info) => <img src={`http:${info.renderValue()}`} />,
    },
    {
      accessorKey: 'score',
      header: () => 'Score',
      cell: (info) => info.renderValue(),
    },
  ])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  })

  if (error)
    return (
      <div className="h-screen m-8 text-4xl text-center text-red-200">
        Failed to load leaderboard: {error.message}
      </div>
    )
  if (!data)
    return (
      <div className="h-screen m-8 text-4xl text-center text-green-200">
        <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24">
          <circle
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="44"
            style={{ opacity: 0.5 }}
          />
          <circle
            fill="#fff"
            stroke="#e74c3c"
            strokeWidth="3"
            cx="8"
            cy="54"
            r="6"
          />
        </svg>
        Loading...
      </div>
    )

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/90 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' ????',
                          desc: ' ????',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-800/95 dark:border-gray-700"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="flex items-center gap-2 my-4">
        <button
          className="p-1 border rounded"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="p-1 border rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="p-1 border rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="p-1 border rounded"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        {/* <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select> */}
      </div>
    </div>
  )
}

export default Table

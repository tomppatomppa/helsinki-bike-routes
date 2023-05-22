import { useTable, Column, useRowState } from 'react-table'

import { useMemo } from 'react'
import { Journey, JourneyTableColumns } from '../../types/journey'

interface JourneyTableProps {
  data: Journey[]
  orderByColumn: (value: JourneyTableColumns) => void
}

const JourneyTable = ({ data, orderByColumn }: JourneyTableProps) => {
  const columns = useMemo<Column<Journey>[]>(
    () => [
      {
        Header: 'Departure Station',
        accessor: 'Departure_station_name',
        width: 150,
      },
      {
        Header: 'Return Station',
        accessor: 'Return_station_name',
        width: 150,
      },
      {
        Header: 'Distance (m)',
        accessor: 'Covered_distance_m',
        width: 75,
      },
      {
        Header: 'Duration (sec.)',
        accessor: 'Duration_sec',
        width: 75,
      },
    ],

    []
  )
  const tableInstance = useTable<Journey>(
    {
      columns,
      data: useMemo<Journey[]>(() => data, [data]),
    },
    useRowState
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <div id="journey-table">
      <table {...getTableProps()} className="w-full text-sm text-left">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="cursor-pointer"
                  style={{ width: column.width }}
                  {...column.getHeaderProps()}
                  onClick={() =>
                    orderByColumn(column.id?.toString() as JourneyTableColumns)
                  }
                >
                  {column.render('Header') as React.ReactNode}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          id="table-rows"
          data-testid="table-rows"
          {...getTableBodyProps()}
        >
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                className="cursor-pointer border-b hover:bg-gray-200 hover:text-gray-600 h-8"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default JourneyTable

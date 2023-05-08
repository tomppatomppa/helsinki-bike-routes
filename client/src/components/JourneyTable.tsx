import { useTable, Column, useRowState } from 'react-table'

import { useMemo } from 'react'
import { Journey } from '../types/journey'

interface Props {
  data: Journey[]
  orderByColumn: (value: string) => void
}
interface TableProps {
  id: number
  Departure_station_name: string
  Departure_station_id: number
  Return_station_name: string
  Return_station_id: number
  Covered_distance_m: number
  Duration_sec: number
}

const JourneyTable = ({ data, orderByColumn }: Props) => {
  const columns = useMemo<Column<TableProps>[]>(
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
        Header: 'Distance',
        accessor: 'Covered_distance_m',
        width: 50,
      },
      {
        Header: 'Duration',
        accessor: 'Duration_sec',
        width: 50,
      },
    ],
    []
  )
  const tableInstance = useTable<TableProps>(
    {
      columns,
      data: useMemo<any[]>(() => data, [data]),
    },
    useRowState
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <div>
      <table {...getTableProps()} className="w-full text-sm text-left mx-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="cursor-pointer"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  style={{ width: column.width }}
                  {...column.getHeaderProps()}
                  onClick={() => orderByColumn(column.id?.toString())}
                >
                  {column.render('Header') as React.ReactNode}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody data-testid="table-rows" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                className="cursor-pointer hover:text-gray-600"
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

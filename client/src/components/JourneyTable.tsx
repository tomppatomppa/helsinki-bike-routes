import { useTable, Column, useRowState } from 'react-table'

import { useMemo } from 'react'
import { Journey } from '../types/journey'

interface Props {
  data: Journey[]
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

const StationTable = ({ data }: Props) => {
  const columns = useMemo<Column<TableProps>[]>(
    () => [
      {
        Header: 'Departure Station',
        accessor: 'Departure_station_name',
      },
      {
        Header: 'Return Station',
        accessor: 'Return_station_name',
      },
      {
        Header: 'Distance',
        accessor: 'Covered_distance_m',
      },
      {
        Header: 'Duration',
        accessor: 'Duration_sec',
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
      <table {...getTableProps()} className="w-full text-sm text-left">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="cursor-pointer"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header') as React.ReactNode}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
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

export default StationTable

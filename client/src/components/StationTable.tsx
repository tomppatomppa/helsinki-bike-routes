import { useTable, Column, useRowState } from 'react-table'
import { Station } from '../types/station'
import { useMemo } from 'react'
interface Props {
  data: Station[]
}
interface TableProps {
  ID: number
  Nimi: string
  Name: string
  Namn: string
  Osoite: string
  Adress: string
  x: string
  y: string
}

const StationTable = ({ data }: Props) => {
  const columns = useMemo<Column<TableProps>[]>(
    () => [
      {
        Header: 'Nimi',
        accessor: 'Nimi',
      },
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Namn',
        accessor: 'Namn',
      },
      {
        Header: 'Osoite',
        accessor: 'Osoite',
      },
      {
        Header: 'Adress',
        accessor: 'Adress',
      },
      {
        Header: 'X',
        accessor: 'x',
      },
      {
        Header: 'Y',
        accessor: 'y',
      },
      {
        Header: 'Map',
        disableSortBy: true,
        accessor: 'ID',
        Cell: ({ row }: any) => (
          <button onClick={() => handleButtonClick(row)}>On Map</button>
        ),
      },
    ],
    []
  )
  const tableInstance = useTable<TableProps>(
    {
      columns,
      data: useMemo<any[]>(() => data, [data]),
      initialState: {
        hiddenColumns: ['x', 'y'],
      },
    },
    useRowState
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  const handleButtonClick = (row: any) => {
    const { ID, Nimi } = row.values

    console.log(`Clicked Station with ID ${ID}, and name ${Nimi}`)
    // You can perform any other actions with the ID and Nimi values here
  }
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
                //onClick={() => handleRowClick(row)}
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

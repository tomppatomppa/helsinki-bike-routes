import { useTable, Column, useExpanded, Row } from 'react-table'
import { Station } from '../types/station'
import { useMemo } from 'react'
import React, { Fragment } from 'react'

import StationDetailsView from './StationDetailsView'
interface Props {
  data: Station[]
  onClick: (value: Station) => void
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

const StationTable = ({ data, onClick }: Props) => {
  const columns = useMemo<Column<TableProps>[]>(
    () => [
      {
        // Make an expander cell
        Header: () => <span>Expand</span>, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }: any) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
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
        Cell: ({ row }: any | JSX.Element) => (
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
    useExpanded
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = tableInstance

  const handleButtonClick = (row: any) => {
    onClick(row.values)
  }
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre>
        <StationDetailsView stationID={row.original.ID} />
      </pre>
    ),
    []
  )

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
        <tbody data-testid="table-rows" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)

            return (
              <Fragment key={row.getRowProps().key}>
                <tr
                  className="cursor-pointer hover:text-gray-600"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns?.length}>
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StationTable

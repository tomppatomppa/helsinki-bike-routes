/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTable, Column, useExpanded, Row } from 'react-table'
import { Station } from '../../types/station'
import { useMemo } from 'react'
import React, { Fragment } from 'react'

import { MdDeleteOutline } from 'react-icons/md'

import StationDetailsView from './StationDetailsView'

interface Props {
  data: Station[]
  onClick: (value: Station) => void
  deleteStation: (stationID: number) => void
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
  isExpanded?: boolean
  delete?: string
}

const StationTable = ({ data, onClick, deleteStation }: Props) => {
  const columns = useMemo<Column<TableProps>[]>(
    () => [
      {
        Header: () => <span>Expand</span>,
        id: 'expander',
        Cell: ({ row }: any) => (
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
        Header: () => null,
        accessor: 'delete',
        Cell: ({ row }: any) => (
          <button
            className="hover:scale-110 flex"
            onClick={() => deleteStation(row.original.ID)}
          >
            <MdDeleteOutline color="red" size={24} />
          </button>
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
    useExpanded<TableProps>
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = tableInstance

  const handleRowClick = (row: any, cell: any) => {
    if (cell.column.id === 'expander') return
    onClick(row.values)
  }

  const renderRowSubComponent = React.useCallback(
    ({ row }: { row: Row<TableProps> }) => (
      <pre>
        <StationDetailsView stationID={row.original.ID} />
      </pre>
    ),
    []
  )

  return (
    <div id="station-table">
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
          {rows.map((row: Row<TableProps>) => {
            prepareRow(row)
            return (
              <Fragment key={row.getRowProps().key}>
                <tr
                  className="cursor-pointer hover:bg-gray-200 border-b hover:text-gray-600 h-8"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      onClick={() => handleRowClick(row, cell)}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
                {/* @ts-ignore */}
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

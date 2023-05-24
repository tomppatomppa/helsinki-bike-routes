<h1 align="center">
  <br>
  Helsinki city bike Client
  <br>
</h1>

<p align="center">
 
  <a href="#InfiniteScroll">InfiniteScroll Components</a>
 
</p>

## InfiniteScroll Components Key features

Both components utilize `useInfiniteQuery` from [ReactQuery](https://tanstack.com/) to fetch data from the backend. The data is displayed using [ReactTable](https://react-table-v7.tanstack.com/). Both components have the same basic functionality. Some additional performance improvements could be achieved with virtualizing the list to only render visible rows.

```jsx
</InfiniteScrollStations>
</InfiniteScrollJourneys>

```

The `useQueryParams` hook is a custom hook that provides functionality for managing query parameters used for data filtering and sorting. It is responsible for maintaining state related to query parameters such as limit, order, search, and search_field. The hooks returns queryParams which then can be used to trigger a refetch when something changes. The rest of the functionality is documented in useQueryParams.test.tsx file

```jsx
 const { queryParams, orderByColumn, findByField, setSearch } =
    useQueryParams()

 //e.g Refetch when search_value or order is changed
 useInfiniteQuery<JourneysDataWithCursor>(
    ['journeys', queryParams.search_value, queryParams.order],
     ({ pageParam = 0 }) =>
      fetchJourneysByCursor(
        pageParam,
        queryParams.limit,
        queryParams.search,
        queryParams.search_field,
        queryParams.order
      ),

```

The `StationTable` component is used to display station data in a table format. It takes three props:

- `data` (required): An array of `Station` objects representing the station data to be displayed.
- `onClick` (required): A callback function that will be called when a station is clicked. It takes a `Station` object as a parameter.
- `deleteStation` (required): A callback function that will be called when the delete button is clicked for a station. It takes the station ID as a parameter.
- \*`orderByColumn` from `useQueryParams` could also be added as the backend supports sorting by column for stations.

```jsx

interface Props {
  data: Station[]
  onClick: (station: Station) => void
  deleteStation: (stationID: number) => void
}

<Stationtable
  data={rows}
  onClick={handleSelectStation}
  deleteStation={deleteStation}
/>

```

The `JourneyTable` component is used to display journey data in a table format. It takes two props:

- `data` (required): An array of `Journey` objects representing the journey data to be displayed.
- `orderByColumn` (required): A callback function that will be called when a column header is clicked for sorting. It takes a `JourneyTableColumns` value as a parameter.

Example usage:

```jsx
import JourneyTable from './JourneyTable';

interface JourneyTableProps {
  data: Journey[];
  orderByColumn: (value: JourneyTableColumns) => void;
}

<JourneyTable
  data={journeys}
  orderByColumn={orderByColumn}
/>
## License

MIT

---

> GitHub [@tomppatomppa](https://github.com/tomppatomppa) &nbsp;&middot;&nbsp;

```

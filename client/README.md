<h1 align="center">
  <br>
  Helsinki city bike Client
  <br>
</h1>

<p align="center">
  <a href="#InfiniteScroll">InfiniteScroll</a>,
  <a href="#InfiniteScroll">Upload</a>,
  <a href="#InfiniteScroll">Forms</a>,
  <a href="#PerformanceOptimisation">Performance</a>
</p>

## InfiniteScroll Components

Both components utilize `useInfiniteQuery` from [ReactQuery](https://tanstack.com/) to fetch data from the backend. The data is displayed using [ReactTable](https://react-table-v7.tanstack.com/). Both components have the same basic functionality. But different enough that I thought that it would be appropriate to create saperate components for both.<p> In hindsight I think having the map as the main focus would have been a good idea. For example in addition to display a single station, when clicking a journey you could see the start and return station on the map.

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

The `</StationTable>` component is used to display station data in a table format. It takes three props:

- `data` (required): An array of `Station` objects representing the station data to be displayed.
- `onClick` (required): A callback function that will be called when a station is clicked. It takes a `Station` object as a parameter.
- `deleteStation` (required): A callback function that will be called when the delete button is clicked for a station. It takes the station ID as a parameter.
- \*`orderByColumn` from `useQueryParams` could also be added as the backend supports sorting by column for stations.
- Has expandable row component to display additional details about a station

```jsx

interface StationTableProps {
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

The `</JourneyTable>` component is used to display journey data in a table format. It takes two props:

- `data` (required): An array of `Journey` objects representing the journey data to be displayed.
- `orderByColumn` (required): A callback function that will be called when a column header is clicked for sorting. It takes a `JourneyTableColumns` value as a parameter.

Example usage:

```jsx

interface JourneyTableProps {
  data: Journey[]
  orderByColumn: (value: JourneyTableColumns) => void
}

<JourneyTable data={journeys} orderByColumn={orderByColumn} />
```

## Uploading files

All the logic related to uploading files are in the `<UploadFile>` component. One problem I encountered uploading 100mb files to the server was the time it took for it complete and with no visual feedback I had to open the database logs to see if something was happening. I added an `useUploadProgress` hook for that purpose as an additional feature to improve user experience.

<p></p> And in addition I didn't want seperate buttons to load Station and Journeys data. I wanted one upload functionality that would recognize what data is being uploaded. Sending the correct file to the correct endpoint ment just passing the filetype to the fetch function.

```jsx
//The function recognizes the filetype based on the headers.
//It will return null if a file doesn't contain the appropriate headers
const filetype = await readCsvFileHeaders(fileObj)
```

<p>

## Forms

The forms are built using `Formik` and form validation using `Yup`.

## Performance Optimisation

To optimize loading times and improve the overall performance of the application, I used React's lazy and Suspense features. Specifically for `<InfiniteScrollStations>`, `<InfiniteScrollJourneys>` and `<Sidebar>`.<p> Some additional performance improvements could be achieved with virtualizing the list to only render visible rows. When e.g scrolling down to the end of the StationTable, there is a noticeable delay when clicking on one of the rows. As selecting a row will cause the StationTable to rerender all the + 400 rows. Or alternatively (maybe a preferable solution) showing the data as pages instead of a infinite list.

```jsx
Using React Developer Tools shows following
Render 50 rows = StationTable (15.2ms of 26.3ms)
Render 400+ rows = StationTable (141.2ms of 225ms)
```

## License

MIT

---

> GitHub [@tomppatomppa](https://github.com/tomppatomppa) &nbsp;&middot;&nbsp;

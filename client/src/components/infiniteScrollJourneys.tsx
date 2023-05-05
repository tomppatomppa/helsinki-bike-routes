import { useInfiniteQuery } from 'react-query'

import {
  JourneysDataWithCursor,
  fetchJourneysByCursor,
} from '../api/journeysApi'

const InfiniteScrollJourneys = () => {
  const {
    data: journeys,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<JourneysDataWithCursor>(
    ['journeys'],
    ({ pageParam = 0 }) => fetchJourneysByCursor(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor
      },
    }
  )
  console.log(journeys)
  return <div>Journeys</div>
}

export default InfiniteScrollJourneys

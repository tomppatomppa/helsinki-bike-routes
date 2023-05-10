import { render } from '@testing-library/react'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'

const queryCache = new QueryCache()
const queryClient = new QueryClient({ queryCache })

export function renderWithClient(ui: React.ReactElement) {
  const { rerender, ...result } = render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={queryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  }
}

export const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

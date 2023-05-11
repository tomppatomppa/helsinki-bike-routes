import Dropdown from './Dropdown'

interface SearchBarProps {
  search: string
  search_field: string
  findByField: (value: string) => void
  setSearch: (value: string) => void
  options: string[]
}

const SearchBar = (props: SearchBarProps) => {
  const { search_field, search, setSearch, findByField, options } = props
  return (
    <div className="flex items-center bg- justify-center flex-wrap bg-gray-300 p-2">
      <Dropdown
        title="Search by"
        options={options}
        value={search_field}
        onSelect={findByField}
      />
      <label>
        Search:
        <input
          disabled={!search_field}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </div>
  )
}

export default SearchBar

import { Input } from './ui/input'
import { useState } from 'react'

type Props = {
  onSearch: (term: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [searchInput, setSearchInput] = useState('')

  return (
    <Input
      className='mt-4'
      placeholder='Search movies...'
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSearch(searchInput)
        } else {
          onSearch('')
        }
      }}
    />
  )
}
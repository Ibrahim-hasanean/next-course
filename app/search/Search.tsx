"use client"
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const Search = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch("");
        router.push(`/search/${search}`);
    }

  return (
      <form onSubmit={handleSearch}>
          <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Enther the search value' />
          <button type='submit' className='bg-blue-500 text-white font-bold py-2 rounded-lg p-2 ml-1' >Search</button>
    </form>
  )
}

export default Search
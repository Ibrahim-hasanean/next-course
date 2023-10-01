"use client"
import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'
import { fetchSuggestions } from '@/lib/fetchSuggestions'

const Header = () => {
  const {board,searchString,setSearchString} = useBoardStore();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");

  // should get summary from gpt but not have qouta
  // useEffect(() => {
  //   if (board.columns.size !== 0) {
  //     setLoading(true);
  //     const fetchSuggestionFunc = async () => {
  //       const suggestions = await fetchSuggestions(board);
  //       setSuggestions(suggestions);
  //       setLoading(false);
  //     }
  //     fetchSuggestionFunc();
  //   } 
    
  // }, [board])
  

  return (
      <header>
      <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl'>
        <div
          className='
        absolute
        top-0
        left-0
        w-full
        h-96
        bg-gradient-to-br
        from-pink-400
        to-[#0055d1]
        rounded-md
        filter
        blur-3xl
        opacity-50
        -z-50
        '
        ></div>
            <Image
                src={"https://links.papareact.com/c2cdd5"}
                alt='trello logo'
                width={300}
                height={100}
                className='w-44 md:w-56 pd-10 md:pb-0 object-contain'
            />
            <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
                <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial' >
                    <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                    <input value={searchString} onChange={(e)=> setSearchString(e.target.value)} type="text" placeholder='search' className='flex-1 outline-none p-2' />
                    <button hidden>Search</button>
                </form>
                <Avatar name='Ibrahim Hasaneen' round color='blue' size='50' />
            </div>              
      </div>
      
      <div className='flex items-center justify-center px-5 md:py-5' >
        <p className='flex justify-center text-sm font-light pr-5 p-5 py-2 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]'>
          <UserCircleIcon className={`inline-block h-10 w-10 text-[#0055d1] mr-1 ${loading && "animate-spin"}`} />
          {!loading && suggestions? suggestions :  "GPT is summarising your tasks for the day ..."}
        </p>
      </div>
    </header>
  )
}

export default Header
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 flex gap-2  bg-blue-500 '>
        <Link href={"/"} className='font-bold text-white mr-3' >Home</Link>
        <Link href={"/todos"} className='font-bold text-white mr-3' >Todos</Link>
        <Link href={"/search"} className='font-bold text-white mr-3' >Search</Link>
    </div>
  )
}

export default Header
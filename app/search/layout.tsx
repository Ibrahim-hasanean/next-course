import React from 'react'
import Search from './Search'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
      <main className='flex space-x-4 divide-x-2 p-5'>
          <div>
              <h1>Search</h1>
          </div>
          <div className='flex-1 pl-5'>
              <Search />
              {children}
          </div>
    </main>
  )
}

export default layout
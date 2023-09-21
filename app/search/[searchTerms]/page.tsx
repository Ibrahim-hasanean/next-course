import React from 'react'
type PageProps={
    params: {
        searchTerms: string;
    }
}

const search =async (searchTerms:string) => {
    const res = await fetch(`https://serpapi.com/search.json?q=${searchTerms}&`);
    const data = await res.json();
    return data;
} 

const page = async ({ params:{searchTerms}}:PageProps) => {
    const searchResults = await search(searchTerms);
  return (
      <div>
          
    </div>
  )
}

export default page
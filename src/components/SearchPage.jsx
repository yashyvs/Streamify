import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import SearchPageVideoCard from './SearchPageVideoCard'
import { SEARCH_VIDEOS_API, VIDEO_DETAILS_API } from '../utils/api'


const SearchPage = () => {
  const [searchResult, setSearchResult] = useState();
  const {searchQuery} = useParams();

  useEffect(()=>{
    getSearchResults(searchQuery)
  },[searchQuery])

  const getSearchResults =async(searchQuery)=>{
    const idData = await fetch(SEARCH_VIDEOS_API+searchQuery);
    const idJson = await idData.json();
    const id = (idJson.items.map((item => {
        return item.id.videoId
    }))).join(',');
    const data = await fetch(VIDEO_DETAILS_API+id);
    const json = await data.json();
    setSearchResult(json.items)
   
}

  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <Sidebar /> 
      <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black'>
        <div className='grid grid-cols-1 gap-2 p-5 '>
          {
            searchResult?.map((data)=>{
              return(
                <SearchPageVideoCard key={data?.id} video={data.snippet} statistics={data.statistics} videoId={data?.id} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage
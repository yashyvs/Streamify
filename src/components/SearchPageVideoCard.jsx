import React from 'react'
import { Link } from 'react-router-dom'

const SearchPageVideoCard = ({video ,statistics, videoId}) => {
  return (
    <Link to={`/video/${videoId}`} >
    <div className='flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl md:p-4 '>
        <div className='relative flex shrink-0 h-auto md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden'>
        <img className='h-full w-full object-cover ' src={video?.thumbnails?.high?.url}/> 
        </div>
        <div className='flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden'>
            <span className='taxt-lg md:text-2xl font-semibold line-clamp-2 text-white'>
            {video?.title} 
            </span>
            <span className='empty:hidden text-sm line-clamp-1 md:line-clamp-2 text-white/[0.7] md:pr-24 md:my-4'>{video?.description }</span>
            <div className='flex items-center'>
        <div className='flex flex-col'>
            <span className='text-sm font-semibold mt-1 text-white/[0.7] flex items-center '>
            {video?.channelTitle}
            </span>
        </div>
        </div>
        </div>
        
    </div>
    </Link>
  )
}

export default SearchPageVideoCard
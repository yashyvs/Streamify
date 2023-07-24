import React from 'react'
import { abbreviateNumber } from 'js-abbreviation-number'
import { Link } from 'react-router-dom'



const VideoCard = ({video ,statistics, videoId}) => {
  return (
    <Link to={`/video/${videoId}`} >
    <div className='flex flex-col mb-8'>
        <div className='relative h-48 md:h-44 md:rounded-xl overflow-hidden'>
            <img className='h-full w-full object-cover ' src={video?.thumbnails?.high?.url}/>
        </div>
        <div className='flex text-white mt-3'>
            <div className='flex flex-col ml-3 overflow-hidden'>
                <span className='text-sm font-bold line-clamp-2 '>
                    {video?.title}
                </span>
                <span className='text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center'>
                    {video?.channelTitle}
                </span>
                <div className='flex text-[12px] font-semibold  text-white/[0.7] truncate overflow-hidden '>
                    <span>{`${abbreviateNumber(statistics?.viewCount, 2)} views`} </span>
                    {!(statistics?.likeCount)?null:
                    <>
                    <span className='flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1'>.</span>
                    <span>{`${abbreviateNumber(statistics?.likeCount, 2)} likes`} </span>
                    </>}
                    
                </div>
            </div>
         </div>
     </div>
     </Link>
    
  )
}

export default VideoCard
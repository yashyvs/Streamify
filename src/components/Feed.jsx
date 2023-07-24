import React from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import VideoCard from './VideoCard'



const Feed = () => {
  const videoData = useSelector (store => store.videoData.videoData)
  
  return (
    <div className='flex flex-row h-[calc(100%-56px)]  bg-black'>
        <Sidebar/>
        <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5'>
          {!videoData ?<FeedShimmer/>: videoData.map((data)=>{
            return(
              <VideoCard key={data?.id} video={data.snippet} statistics={data.statistics} videoId={data?.id}/>
              )
          })}
          </div>
         
        </div>
    </div>
  )
}

export default Feed
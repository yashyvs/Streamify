import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarMenuItems from './SidebarMenuItems'
import { categories } from '../utils/categories'
import { useDispatch } from 'react-redux'
import { setCategory } from '../utils/categorySlice'
import { useSelector } from 'react-redux'
import { SEARCH_VIDEOS_API, VIDEO_DETAILS_API } from '../utils/api'
import { setVideoData } from '../utils/videoDataSlice'



const Sidebar = () => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector (store => store.category.category)
    const mobileMenu = useSelector (store => store.mobileMenu.mobileMenu)
    
    useEffect (()=>{
        getVideos(selectedCategory);
    },[selectedCategory])
    
    const getVideos= async(searchItem)=>{
        const idData = await fetch(SEARCH_VIDEOS_API+searchItem)
        const idJson = await idData.json();
        const id = (idJson.items.map((item => {
            return item.id.videoId
        }))).join(',')
        const data = await fetch(VIDEO_DETAILS_API+id);
        const json = await data.json();
        dispatch(setVideoData(json.items))
    }
    const navigate = useNavigate()

    const handleClick =(name, type) =>{
        switch(type){
            case "category":
                return dispatch(setCategory(name))
            case "home":
                return dispatch(setCategory(name))
            case "menu":
                return false
            default:
                break;
        }
    }


  return (
    <div className={`  ${ !mobileMenu ?"":'translate-x-[0px]'} md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all `}>
    
        <div className='flex px-5 flex-col '>
        {categories.map((category) =>{
                return (
                    <React.Fragment key= {category.name}>
                    <SidebarMenuItems 
                        
                        text={category.type ==='home' ? "Home" : category.name} 
                        icon={category.icon}
                        action={()=>{
                            handleClick(category.name,category.type);
                            navigate("/")
                        }}
                        className={`${selectedCategory === category.name ?'bg-white/[0.15]':''}`}
                        />
                        {category.divider &&(
                            <hr className='my-5 border-white/[0.2]'/>
                        )}
                   
                    </React.Fragment>
                )
            })}
            <hr className='my-5 border-white/[0.2]'/>
        </div>
    </div>
  )
}

export default Sidebar
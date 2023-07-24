import { createSlice } from "@reduxjs/toolkit";

const videoDataSlice = createSlice({
    name: 'videoData',
    initialState: {
        videoData : []
    },
    reducers:{
        setVideoData: (state, action) =>{
            state.videoData = action.payload;
        }
    }
});

export const {setVideoData} = videoDataSlice.actions;

export default videoDataSlice.reducer;

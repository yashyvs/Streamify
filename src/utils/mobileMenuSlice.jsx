import { createSlice } from "@reduxjs/toolkit";

const mobileMenuSlice = createSlice({
    name: 'mobileMenu',
    initialState: {
        mobileMenu : false
    },
    reducers:{
       toggleMoblieMenu : (state, action) =>{
            state.mobileMenu = !(state.mobileMenu);
        }
    }
});

export const {toggleMoblieMenu} = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;

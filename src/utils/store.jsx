import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import videoDataSlice from "./videoDataSlice";
import mobileMenuSlice from "./mobileMenuSlice";

const store = configureStore({
    reducer:{
        category: categorySlice,
        videoData : videoDataSlice,
        mobileMenu : mobileMenuSlice,
    }
});

export default store;
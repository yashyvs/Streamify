import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Feed from "./components/Feed"
import { Provider } from "react-redux"
import store from "./utils/store"
import VideoPage from "./components/VideoPage"
import SearchPage from "./components/SearchPage"


function App() {
  

  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className='flex flex-col h-full'>
        <Header />
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/video/:id' element={<VideoPage/>} />
          <Route path='/searchReasult/:searchQuery' element={<SearchPage/>} />
         
        </Routes>
      </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App

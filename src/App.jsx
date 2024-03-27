import React, { useEffect } from 'react'
import {Route,Routes,BrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import PageNotFound from './pages/404/PageNotFound'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import Header from './components/header/Header'
import Footer from './components/footer/footer'  
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './utils/api'
import { getApiConfiguration, getGenres } from './store/homeSlice'

const App = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.homeSlice);
  // console.log(url);
  useEffect(() => {
      fetchApiConfig();
      genresCall();
  }, []);

  const fetchApiConfig = () => {
      fetchData("/configuration").then((res) => {
          // console.log(res);
          const url = {
              backdrop: res.images.secure_base_url + "original",
              poster: res.images.secure_base_url + "original",
              profile: res.images.secure_base_url + "original",
          };
          dispatch(getApiConfiguration(url));
      });
  };
  const genresCall= async()=>{
    const promises = [];
    const endPoints = ["tv","movie"];
    const Allgenres = {}
    endPoints.forEach((url)=>{
      return promises.push(fetchData(`/genre/${url}/list`));
    })
    const data = await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=>(
        Allgenres[item.id] = item
      ))
    })
   dispatch(getGenres(Allgenres));
  }


  return (
    <div>
       <BrowserRouter>
       <Header/>
          <Routes>
             <Route path='/' element={<Home/>}/>
             <Route path='/:mediaType/:id' element={<Details/>}/>
             <Route path='/search/:query' element={<SearchResult/>}/>
             <Route path='/explore/:mediaType' element={<Explore/>}/>
             <Route path='/*' element={<PageNotFound/>}/>
          </Routes>
          <Footer/>
       </BrowserRouter>
    </div>
  )
}

export default App
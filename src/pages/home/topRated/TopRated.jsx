import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {
    const [endPoint,setEndPoints] = useState("movie");
    const {data,loading} = useFetch(`/${endPoint}/top_rated`) 
    const onTabChange = (tab)=>{
        console.log(tab); 
        setEndPoints(tab==="Movies"?"movie":"tv");
    }
  return ( 
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">
                 Top Rated
            </span>
            <SwitchTabs data={["Movies","Tv Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel 
        data={data?.results} 
        endPoint={endPoint}
        loading={loading}/>
    </div>
  )
}

export default TopRated;
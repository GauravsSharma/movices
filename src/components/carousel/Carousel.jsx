import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./carousel.scss";
import { CircleRating } from '../circleRating/CircleRaing'
import Genres from "../genres/Genres";
const Carousel = ({ data, loading,endPoint,title }) => {
    const carouselRef = useRef()
    // console.log(data);
    const { url } = useSelector((state) => state.homeSlice);
    const navigate = useNavigate()

    const navigat = (dir) => {

     const container = carouselRef.current;
     const scrollAmount = dir==='left'?container.scrollLeft-(container.offsetWidth+20):container.scrollLeft+(container.offsetWidth+20)
     container.scrollTo({
        left:scrollAmount,
        behavior:"smooth"
     })
    }


    const sklLoader = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton">
                    </div>
                    <div className="date skeleton"></div>
                </div>

            </div>
        )
    }
    //  console.log(refer.current);
    return (
        <div ref={carouselRef} className="carousel">
            <ContentWrapper>
                { 
                    title&&<div className="carouselTitle">
                        {title}
                    </div>
                }
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigat("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigat("right")}
                />
                {
                    !loading ? (
                        <div className="carouselItems"
                        ref={carouselRef}
                        >
                            {
                                data?.map((item) => {
                                    const poster = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                                    return (
                                        <div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type||endPoint}/${item.id}`)}>
                                            <div className="posterBlock">
                                                <Img src={poster}/>
                                                <CircleRating rating={item.vote_average.toFixed(1)} />
                                                <Genres data={item.genre_ids.slice(0,2)}/>
                                            </div>
                                            <div className="textBlock">
                                                <span className="title">
                                                    {item.title || item.name}
                                                </span>
                                                <span className="date">
                                                    {dayjs(item.release_Date).format("MMM D,YYYY")}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {sklLoader()}
                            {sklLoader()}
                            {sklLoader()}
                            {sklLoader()}
                            {sklLoader()}
                            {sklLoader()}
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    )
}

export default Carousel;
import React from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './casts/Casts'
import VideosSection from './videoSection/VideoSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'
const Details = () => {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data:credits, loading:creditLoading } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <>
      <div>Details</div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditLoading}/>
      <VideosSection data={data}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation  mediaType={mediaType} id={id}/>
    </>
  )
}

export default Details  
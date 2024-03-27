import React, { useEffect, useState } from 'react'
import './style.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchData } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import MovieCart from '../../components/movieCart/MovieCart'
import Spinner from '../../components/spinner/Spinner'
import noResults from '../../assets/no-results.png'
import { useParams } from 'react-router-dom'
const searchResult = () => {
  const [data, setData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(true)
  const { query } = useParams()

  const fetchQueryData = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res);
      console.log(res);
      setLoading(false)
      setPageNum((prev) => prev + 1)
    })
    // console.log(data);
  }
  const fetchNextPageData = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data, results: [...data?.results, ...res?.results]
        })
        setLoading(false)
      }
      else {
        setData(res)
      }
      setPageNum((prev) => prev + 1)
    })
    // console.log(data);
  }
  useEffect(() => {
    setPageNum(1)
    fetchQueryData();
  }, [query])
  return (
    <div className='searchResultsPage'>
      {
        loading && <Spinner initial={true} />
      }
      {
        !loading&&(
          <ContentWrapper>
            {
              data?.results?.length>0?(
                <>
                  
                    <div className="pageTitle">
                       {
                        `Search ${data?.results?.length>1?"results":"result"} of '${query}'`
                       }
                    </div>
                  <InfiniteScroll
                  className='content'
                  dataLength={data?.results?.length||[]}
                  next={fetchNextPageData}
                  hasMore={pageNum<=data?.total_pages}
                  loader={<Spinner/>}
                  >
                    {data?.results.map((item,idx)=>{    
                    if(item.media_type==="person") return
                    return(
                      <MovieCart key={idx} data={item} fromSearch={true} />
                    )
                    })}
                  </InfiniteScroll>
                </>
              ):(
                <span className="resultNotFound">
                 Sorry, result not found
                </span>
              )
            }
          </ContentWrapper>
        )
      }

    </div>
  )
}

export default searchResult
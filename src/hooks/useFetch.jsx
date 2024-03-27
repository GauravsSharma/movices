import { useState } from 'react'
import {fetchData} from '../utils/api'
import { useEffect } from 'react';
const useFetch =(url)=>{
    const [loading,setLoading] = useState(null);
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    useEffect(()=>{
        setLoading("Loading...");
        setError(null);
        setData(null)
       try {
        fetchData(url).then((res)=>{
            setLoading(false);
            setData(res);
        })
       } catch (error) {
         setLoading(false);
         setError("Something went wrong while fetching the data!!",error);
       }
    },[url])
   return {data,error,loading};
}
export default useFetch;
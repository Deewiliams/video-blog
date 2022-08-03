import React,{useEffect, useState} from 'react'
import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../firebase'
import { getAllFeeds } from '../Utils/FetchData'
import Spinner from './Spinner'

const Feed = () => {
  const firebaseDb = getFirestore(firebaseApp)

  const [feeds,setFeeds] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    getAllFeeds(firebaseDb).then((data) => {
      setFeeds(data)
      console.log(data);
      setLoading(false)
      
    })
  },[])

  if(loading) {
    return <Spinner />
  }
  return (
    <div>Feed</div>
  )
}

export default Feed
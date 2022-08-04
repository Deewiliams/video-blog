import React, { useEffect, useState } from 'react'
import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../firebase'
import { getAllFeeds,categoryFeeds} from '../Utils/FetchData'
import Spinner from './Spinner'
import { SimpleGrid } from '@chakra-ui/react'
import VideoPin from './VideoPin'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'

const Feed = () => {
  const firebaseDb = getFirestore(firebaseApp)

  const [feeds, setFeeds] = useState(null)
  const [loading, setLoading] = useState(false)

  const {categoryId} = useParams()


  useEffect(() => {
    setLoading(true)
    if(categoryId){
      categoryFeeds(firebaseDb, categoryId).then((category) => {
        setFeeds(category)
        setLoading(false)
      })
    }else {
      getAllFeeds(firebaseDb).then((data) => {
        setFeeds(data)
        setLoading(false)
      })
    }
    
  }, [categoryId])

  if (loading) {
    return <Spinner msg={'Loading your feeds'} />
  }

  if (!feeds?.length > 0) {
   return <NotFound />
  }

  return (
    <SimpleGrid minChildWidth='300px' spacing='15px' width={'full'} alignItems="center" autoColumns={'max-content'} px='2' overflow={'hidden'} >
      {feeds && feeds.map((feed) => (
        <VideoPin key={feed.id} maxWidth={420} height='80px' feed={feed} />
      ))}
    </SimpleGrid>
  )
}

export default Feed
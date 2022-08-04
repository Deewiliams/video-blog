import React, { useEffect, useState } from 'react'
import { getFirestore } from 'firebase/firestore' 
import { firebaseApp } from '../firebase'
import { getAllFeeds } from '../Utils/FetchData'
import Spinner from './Spinner'
import { SimpleGrid } from '@chakra-ui/react'
import VideoPin from './VideoPin'

const RecommendedVideo = ({feeds}) => {
  return (
    <SimpleGrid minChildWidth='300px' spacing='15px' width={'full'} alignItems="center" autoColumns={'max-content'} px='2' overflow={'hidden'} >
    {feeds && feeds.map((feed) => (
      <VideoPin key={feed.id} maxWidth={420} height='80px' feed={feed} />
    ))}
  </SimpleGrid>
  )
}

export default RecommendedVideo
import React,{useEffect, useState} from 'react'
import Spinner from './Spinner'
import { Flex,Image } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../firebase';
import { getUserInfo,userUploadedVideos } from '../Utils/FetchData';
import RecommendedVideo from './RecommendedVideo';
const randomImage = "https://source.unsplash.com/1600x900/?nature,photography,technology";

const UserProfile = () => {

  const {userId} = useParams();
  console.log('id',userId);
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [feeds,setFeeds] = useState(null)
  
const firebaseDb = getFirestore(firebaseApp)

useEffect(() => {
setIsLoading(true)
if(userId){
  getUserInfo(firebaseDb, userId).then((user) => {
    setUserInfo(user)

    userUploadedVideos(firebaseDb,userId).then((feed) => {
      setFeeds(feed)
      console.log('user',feed);
    })
    setIsLoading(false)
  })
}
},[userId])

  if(isLoading){
     <Spinner />
  }
  return (
    <Flex
    alignItems={'center'}
    justifyContent="center"
    width={"full"}
    height='auto'
    p={2}
    direction="column"
    >
     <Flex
    alignItems={'center'}
    justifyContent="center"
    width={"full"}
    height='auto'
    p={2}
    direction="column"
    >
      <Image 
      src={randomImage}
      height={'320px'}
      width="full"
      objectFit={"cover"}
      borderRadius={'md'}
      /> 

<Image 
      src={userInfo?.photoURL}
      width="120px"
      objectFit={"cover"}
      border="2px"
      borderRadius={'md'}
      rounded='full'
      shadow={'lg'}
      mt="-6"
      /> 

    </Flex>

    {
                feeds && (
                    <Flex 
                    direction={"column"}
                     width="full"
                     my={6}
                    > 
                    <RecommendedVideo feeds={feeds} />
                    </Flex>

                )
            }
    </Flex>
  )
}

export default UserProfile
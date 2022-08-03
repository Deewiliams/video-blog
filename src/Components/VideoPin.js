import React, { useState, useEffect } from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useColorModeValue, useColorMode } from '@chakra-ui/react'
import { getUserInfo } from '../Utils/FetchData'

import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../firebase'
import moment from 'moment'

const VideoPin = ({ feed }) => {
  const firebaseDb = getFirestore(firebaseApp)

  const { colorMode } = useColorMode();
  const bg = useColorModeValue("blackAlpha.700", "gray.900");
  const textColor = useColorModeValue("gray.100", "gray.100");

  const [userId, setUserId] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (feed) setUserId(feed.userId);
    if (userId) getUserInfo(firebaseDb, userId).then((data) => {
      setUserInfo(data)
    })
  }, [userId])
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems='center'
      direction={"column"}
      cursor='pointer'
      _hover={{ shadow: '1px' }}
      rounded='md'
      overflow={'hidden'}
      position='relative'
      maxWidth={'300px'}
    >
      <Link to={`/videoDetail/${feed.id}`} >
        <video
          src={feed.videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        />
      </Link>
      <Flex
        position={'absolute'}
        bottom='0'
        left='0'
        p='2px'
        bg={bg}
        width='full'
        direction={'column'}
      >
        <Flex
          width={'full'}
          justifyContent='space-between'
          alignItems={'center'}
        >
          <Text color={textColor} isTruncated fontSize={20}  >{feed.title}</Text>
          <Link to={`/userDetails/${userId}`} >
            <Image
              src={userInfo?.photoURL}
              rounded='full'
              width={'50px'}
              height={'50px'}
              border='2px'
              borderColor={bg}
              mt={'-10'}
            />
          </Link>
        </Flex>
        <Text
          fontSize={12}
          color={textColor}
          ml='auto'
        >
          {moment(new Date(parseInt(feed.id)).toISOString()).fromNow()}
        </Text>
      </Flex>

    </Flex>
  )
}

export default VideoPin
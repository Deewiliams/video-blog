import React, { useEffect, useState } from 'react'
import { Flex,Box,Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { IoHome } from 'react-icons/io5'
import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../firebase'
import { getSpecificVideo } from '../Utils/FetchData'
import { useColorModeValue, useColorMode } from '@chakra-ui/react'

import Spinner from './Spinner'

const VideoPinDetails = () => {
    const { colorMode } = useColorMode();
    const bg = useColorModeValue("gray.600", "gray.300");
    const textColor = useColorModeValue("gray.600", "gray.300");
    const { videoId } = useParams();

    const firebaseDb = getFirestore(firebaseApp)
    const [isLoding, setIsLoading] = useState(false)
    const [videoInfo, setVideoInfo] = useState(null)

    useEffect(() => {
        if (videoId) {
            setIsLoading(true)
            getSpecificVideo(firebaseDb, videoId).then((data) => {
                setVideoInfo(data)
                setIsLoading(false)
            })
        }
    }, [videoId])

    if (isLoding) {
        return <Spinner />
    }
    return (
        <Flex
            justifyContent={"center "}
            width={'full'}
            height="auto"
            alignItems={'center'}
            direction='column'
            py={2}
            px={4}
        >
            <Flex
                alignItems={"center"}
                width="full"
                my={4}
            >
                <Link to={'/'} >
                <IoHome fontSize={25} />
                </Link>
               <Box
                width='1px'
                height={"25px"}
                bg={"gray.500"}
                mx={2}
               >
                </Box>
                <Text isTurncated color={textColor} fontWeight='semibold' width={'100%'} >
                    {videoInfo?.title}
                </Text>
               
            </Flex>
        </Flex>
    )
}

export default VideoPinDetails
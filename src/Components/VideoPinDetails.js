import React, { useEffect, useState, useRef } from 'react'
import { Flex, Box, Text, GridItem, Grid, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Image } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { IoHome, IoPlay, IoPause } from 'react-icons/io5'
import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../firebase'
import { getSpecificVideo } from '../Utils/FetchData'
import { useColorModeValue, useColorMode } from '@chakra-ui/react'
import logo from '../Images/logo.png'
import Spinner from './Spinner'
import ReactPlayer from 'react-player'
import { MdForward10, MdFullscreen, MdOutlineReplay10, MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import { format } from '../Utils/Help'
import screenfull from 'screenfull'
import { getUserInfo } from '../Utils/FetchData'

const avatar = "https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=164360626";

const VideoPinDetails = () => {
    const { colorMode } = useColorMode();
    const bg = useColorModeValue("gray.600", "gray.300");
    const textColor = useColorModeValue("gray.600", "gray.300");
    const { videoId } = useParams();

    const firebaseDb = getFirestore(firebaseApp)
    const [isLoding, setIsLoading] = useState(false)
    const [videoInfo, setVideoInfo] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [played, setPlayed] = useState(0)
    const [seeking, setSeeking] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    const playerRef = useRef();
    const playerContainer = useRef();

    useEffect(() => {
        if (videoId) {
            setIsLoading(true)
            getSpecificVideo(firebaseDb, videoId).then((data) => {
                setVideoInfo(data)
                //getting a user information
                getUserInfo(firebaseDb, data.userId).then((user) => {
                    setUserInfo(user)
                })
                setIsLoading(false)
            })
        }
    }, [videoId])

    useEffect(() => {

    }, [muted, volume, played])

    const onVolumeChange = (e) => {
        setVolume(parseFloat(e / 100))
        e === 0 ? setMuted(true) : setMuted(false);

    }

    const handleFastRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
    }

    const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
    }

    const handleProgress = (changeState) => {
        if (!seeking) {
            setPlayed(parseFloat(changeState.played / 100) * 100)
        }

    }

    const handleSeekingChange = (e) => {
        setPlayed(parseFloat(e / 100))

    }

    const OnseekMouseDown = (e) => {
        setSeeking(true)
    }

    const onSeekMouseUp = (e) => {
        setSeeking(false)
        playerRef.current.seekTo(e / 100)
    }

    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';

    const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';

    const elapsedTime = format(currentTime)
    const totalDuration = format(duration)


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
            <Grid templateColumns='repeat(3,1fr)' gap={2} width='100%' >
                <GridItem width={'100%'} colSpan='2' >
                    <Flex width={'full'}
                        bg='black'
                        position='relative'
                        ref={playerContainer}
                    >
                        <ReactPlayer
                            ref={playerRef}
                            url={videoInfo?.videoUrl}
                            width='100%'
                            height='100%'
                            playing={isPlaying}
                            muted={muted}
                            volume={volume}
                            onProgress={handleProgress}
                        />
                        <Flex
                            position={"absolute"}
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            direction="column"
                            justifyContent={'space-between'}
                            alignItems='center'
                            zIndex={1}
                            cursor='pointer'
                        >
                            <Flex
                                justifyContent={'center'}
                                alignItems='center'
                                onClick={() => { setIsPlaying(!isPlaying) }}
                                width="full"
                                height='full'
                            >
                                {!isPlaying && (
                                    <IoPlay fontSize={60} color="#f2f2f2" cursor='pointer' />
                                )}
                            </Flex>
                            <Flex
                                width={'full'}
                                alignItems='center'
                                direction='column'
                                p={4}
                                bgGradient="linear(to-t, blackAlpha.900,blackAlpha.500, blackAlpha.50)"
                            >
                                <Slider aria-label='slider-ex-4' min={0} max={100}
                                    value={played * 100}
                                    onChange={handleSeekingChange}
                                    onMouseDown={OnseekMouseDown}
                                    onChangeEnd={onSeekMouseUp}
                                >
                                    <SliderTrack bg="teal.50">
                                        <SliderFilledTrack bg="teal.300" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={3} bg="teal.300" />
                                </Slider>

                                <Flex
                                    width={'full'}
                                    alignItems='center'
                                    my={2}
                                    gap={10}
                                >
                                    <MdOutlineReplay10 fontSize={30} color="#f1f1f1" cursor="pointer" onClick={handleFastRewind} />
                                    <Box onClick={() => setIsPlaying(!isPlaying)} >
                                        {!isPlaying ? <IoPlay fontSize={30} color="#f2f2f2" cursor='pointer' /> : <IoPause fontSize={30} color="#f2f2f2" cursor='pointer' />}
                                    </Box>
                                    <MdForward10 fontSize={30} color="#f1f1f1" cursor="pointer" onClick={handleFastForward} />

                                    <Flex
                                        alignItems={'center'}
                                    >
                                        <Box onClick={() => setMuted(!muted)} >
                                            {!muted ? <MdVolumeUp fontSize={30} color='#f1f1f1' cursor='pointer' /> : <MdVolumeOff fontSize={30} color='#f1f1f1' cursor='pointer' />}
                                        </Box>
                                        <Slider aria-label='slider-ex-1'
                                            defaultValue={volume * 100}
                                            min={0}
                                            max={100} size='sm'
                                            width={16}
                                            mx={2}
                                            onChangeStart={onVolumeChange}
                                            onChangeEnd={onVolumeChange}
                                        >
                                            <SliderTrack bg="teal.50">
                                                <SliderFilledTrack bg="teal.300" />
                                            </SliderTrack>
                                            <SliderThumb boxSize={2} bg="teal.300" />
                                        </Slider>
                                    </Flex>

                                    <Flex alignItems={'center'} gap={2}>
                                        <Text fontSize={16} color="whitesmoke">{elapsedTime} </Text>
                                        <Text fontSize={16} color="whitesmoke">/</Text>
                                        <Text fontSize={16} color="whitesmoke">{totalDuration} </Text>
                                    </Flex>

                                    <Image src={logo} width={'100px'} ml='auto' />
                                    <MdFullscreen fontSize={30} color="#f1f1f1" cursor={'pointer'}
                                        onClick={() => { screenfull.toggle(playerContainer.current) }} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    {videoInfo?.description && (
                        <Flex my={6} direction='column' >
                            <Text my={2} fontSize={25} fontWeight='semibold' >
                                Description
                            </Text>
                            {videoInfo?.description}
                        </Flex>
                    )}
                </GridItem>
                <GridItem width={'100%'} colSpan='1' >
                    {
                        userInfo && (
                            <Flex direction={'column'} width={'full'} >
                                <Flex alignItems={'center'} width={'full'} >
                                    <Image src={userInfo?.photoURL ? userInfo?.photoURL : avatar}
                                        rounded='full'
                                        width={'60px'}
                                        height={'60px'}
                                        border='2px'
                                        minHeight={'60px'}
                                        minWith={'60px'}
                                    />
                                    <Flex direction={'column'} ml={3} >
                                        <Flex alignItems={'center'} >
                                            <Text my={2} fontSize={25} fontWeight='semibold' >
                                                
                                                {userInfo?.displayName}
                                            </Text>
                                        </Flex>

                                    </Flex>

                                </Flex>

                            </Flex>
                        )
                    }

                </GridItem>
            </Grid>
        </Flex>
    )
}

export default VideoPinDetails
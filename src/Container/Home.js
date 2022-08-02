import React from 'react'
import { Flex } from '@chakra-ui/react';
import { Category, NavBar, Feed, Create, VideoPin,Search } from '../Components/Index';
import { Routes, Route } from "react-router-dom";

const Home = ({ user }) => {
    console.log('user', user);
    return (
        <>
            <NavBar user={user} />
            <Flex
                direction={'column'}
                justifyContent="start"
                alignItems={"center"}
                width="20"
            >
                <Category />
            </Flex>
            <Flex
                width={'full'}
                justifyContent='center'
                alignItems={'center'}
                px='4'
            >
                <Routes>
                    <Route path='/' element={<Feed />} />
                    <Route path='/category/:categoryId' element={<Feed />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/videoDetail/:videoId' element={<VideoPin />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
            </Flex>
        </>
    )
}

export default Home
import React from 'react'
import logo from '../Images/logo.png'
import { useNavigate, Link } from 'react-router-dom'
import { useColorModeValue,useColorMode } from '@chakra-ui/react'
import { Flex,Image } from '@chakra-ui/react'


const NavBar = ({user}) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const bg = useColorModeValue("gray.600", "gray.300");
  return (
    <Flex
    justifyContent={'space-between'}
    alignItems='center'
    width={'100vw'}
    p={4}
    >
<Link to={'/'} >
<Image src={colorMode == 'light ' ? 'vision creation' : logo} width={'180px'} /> 
</Link>
    </Flex>
  )
}

export default NavBar
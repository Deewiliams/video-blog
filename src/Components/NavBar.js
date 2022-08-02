import React from 'react'
import logo from '../Images/logo.png'
import { useNavigate, Link } from 'react-router-dom'
import { useColorModeValue, useColorMode } from '@chakra-ui/react'
import { Flex, Image, InputGroup, InputLeftElement, Input, MenuButton, MenuList, Menu, MenuItem, Button } from '@chakra-ui/react'
import { IoAdd, IoLogOut, IoMoon, IoSearch, IoSunny } from 'react-icons/io5'


const NavBar = ({ user }) => {
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

            <InputGroup mx={6} width='60vw'>
                <InputLeftElement
                    pointerEvents='none'
                    children={<IoSearch fontSize={25} />}
                />
                <Input type='text' placeholder='Search...'
                    fontSize={18}
                    fontWeight='medium'
                    varient={"filled"}
                />
            </InputGroup>

            <Flex justifyContent={'center'} alignItems='center'>
                <Flex
                    width={"40px"}
                    height="40px"
                    alignItems='center'
                    cursor={'pointer'}
                    borderRadius='5px'
                    onClick={toggleColorMode}
                >
                    {colorMode == 'light' ? (<IoMoon fontSize={25} />) : (<IoSunny fontSize={25} />)}
                </Flex>

                <Link to={'/create'}>
                    <Flex justifyContent={"center"}
                        alignItems="center" bg={bg}
                        width="40px"
                        height="40px"
                        borderRadius='5px'
                        mx={6}
                        cursor='pointer'
                        _hover={{ shadow: 'md' }}
                        transition="ease-in-out"
                        transitionDuration={"0.3s"}
                    >
                        <IoAdd fontSize={25} color={`${colorMode == 'dark' ? '#111' : '#f1f1f1'}`} />
                    </Flex>
                </Link>

                <Menu>
                    <MenuButton>
                        <Image src={user?.photoURL}
                            width='40px'
                            height='40px'
                            rounded="full" />
                    </MenuButton>
                    <MenuList>
                        <Link to={''}>
                            <MenuItem>My Account</MenuItem>
                        </Link>
                        <MenuItem 
                        flexDirection={'row '}
                        alignItems="center"
                        gap={4}
                        >Logout <IoLogOut fontSize={20} /> </MenuItem>
                    </MenuList>
                </Menu>


            </Flex>
        </Flex>
    )
}

export default NavBar
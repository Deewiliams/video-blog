import { Button, Flex, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import background from '../Images/student.jpeg'
import {FcGoogle} from 'react-icons/fc'

const Login = () => {
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            width={"100vw"}
            height={"100vh"}
            position={"relative"}
        >
            <Image src={background}
                objectFit="cover"
                width={"full"}
                height={"full"}
            />
            <Flex
            position={"absolute"}
            width={"100vw"}
            height={"100vh"}
            bg={"backAlpha.600"}
            top={0}
            left={0}
            justifyContent="center"
            alignItems={"center"}

>
            <HStack>
                <Button leftIcon={<FcGoogle fontSize={25} />} colorScheme="whiteAlpha" shadow={"lg"} >
                    Sign in with Google
                </Button>
            </HStack>
            </Flex>
        </Flex>
    )
}

export default Login
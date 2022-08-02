import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import background from '../Images/student.jpeg'

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
        </Flex>
    )
}

export default Login
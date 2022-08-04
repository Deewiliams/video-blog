import React from 'react'
import NotFoundImage from '../Images/notfound.svg'
import { Flex, Image, Text } from '@chakra-ui/react'

const NotFound = () => {
    return (
        <Flex
            width={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            direction="column"
        >
            <Image
                src={NotFoundImage}
                width={600}
            />
            <Text fontSize={40} fontWeight="semibold" fontFamily={"cursive"} >
                Not Found
            </Text>
        </Flex>
    )
}

export default NotFound
import React, { useEffect } from 'react'
import { Flex, Progress, Text } from '@chakra-ui/react'
import { Circles } from 'react-loader-spinner'

const Spinner = () => {
    useEffect(() => {

    }, [Progress])
    return (
        <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems='center'
            height={"full"}
            px={10}
        >
            <Circles color="#00BFFF" hight={80} width={80} />
        </Flex>
    )
}

export default Spinner
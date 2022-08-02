import React, { useEffect } from 'react'
import { Flex, Progress, Text } from '@chakra-ui/react'
import { Circles } from 'react-loader-spinner'

const Spinner = ({ msg, progress }) => {
    useEffect(() => {

    }, [progress])
    return (
        <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems='center'
            height={"full"}
            px={10}
        >
            <Circles color="#00BFFF" hight={80} width={80} />
            <Text textAlign="center" fontSize={25} px={2} >
                {msg}
            </Text>

            {progress && (
                <Progress
                    hasStripe
                    mt={50}
                    isAnimated
                    size='sm'
                    value={Number.parseInt(progress)}
                    width={'lg'}
                    rounded='sm'
                    colorScheme={"linkedin"}
                />
            )}
        </Flex>
    )
}

export default Spinner
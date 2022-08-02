import { useColorModeValue, useColorMode, FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Flex, Input, Menu, MenuButton, MenuList, MenuItem, Button, Text, InputGroup, InputLeftElement,Box } from '@chakra-ui/react';
import { IoChevronDown, IoCloudUpload, IoLocation } from 'react-icons/io5';
import { categories } from '../data';
import Spinner from './Spinner';

const Create = () => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.50");

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('Choose category')
  const [videoAsset, setVideoAsset] = useState(null)
  const [loading, setLoading] = useState(true)

  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
      width={"full"}
      minHeight="100vh"
      padding={10}
    //  bg={bg}
    >
      <Flex
        width={'80%'}
        height={'full'}
        border={'1px'}
        borderColor='gray.300'
        borderRadius={'md'}
        p="4"
        flexDirection={'column'}
        alignItems='center'
        justifyContent={'center'}
        gap={2}
      >
        <Input variant='flushed' placeholder='Title'
          focusBorderColor="gray.400"
          isRequired
          errorBorderColor='red'
          type={'text'}
          _placeholder={{ color: 'gray.500' }}
          fontSize={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Flex
          justifyContent={'space-between'}
          width='full'
          alignItems={'center'}
          gap={8}
          my={4}
        >
          <Menu>
            <MenuButton width={'full'} colorScheme='blue' as={Button} rightIcon={<IoChevronDown fontSize={25} />} >
              {category}
            </MenuButton>
            <MenuList zIndex={101} width={'md'} shadow="x1">
              {categories && categories.map((category) => (
                <MenuItem key={category.id} _hover={{ bg: 'blackAlph.300' }}
                  fontSize={20}
                  px={4}
                  onClick={() => setCategory(category.name)}
                >
                  {category.iconSrc}
                  <Text fontSize={18} ml={4}>
                    {category.name}
                  </Text>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <InputGroup mx={6} width='60vw'>
            <InputLeftElement
              pointerEvents='none'
              children={<IoLocation fontSize={25} color={`${colorMode == "dark" ? "#f1f1f1" : "#111s"}`} />}
            />
            <Input
              placeholder='Location'
              focusBorderColor="gray.400"
              isRequired
              errorBorderColor='red'
              type={'text'}
              _placeholder={{ color: 'gray.500' }}
              fontSize={20}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fontWeight='medium'
              varient={"filled"}
            />
          </InputGroup>
        </Flex>
          <Flex 
          border={"1px"}
          borderColor="gray.500"
          height={"400px"}
          borderStyle="dashed"
          width="full"
          borderRadius={'md'}
          overflow="hidden"
          postion={"relative"}
          >
            {!videoAsset ? <FormLabel width={'full'}>
              <Flex
              direction={'column'}
              alignItems='center'
              justifyContent={'center'}
              height='full'
              width={'full'}
              >
                 <Flex
              direction={'column'}
              alignItems='center'
              justifyContent={'center'}
              height='full'
              width={'full'}
              cursor="pointer"
              >
                {loading ? (
                <Spinner />
                ) : (
                <>
                <IoCloudUpload fontSize={30} color={`${colorMode == "dark" ? "#f1f1f1" : "#111s"}`}/>
                <Text mt={5} fontSize={20} color={textColor}>
                    Click to upload
                  </Text>
                </>)}
                
              </Flex>
              </Flex>
            </FormLabel> : (<Box> Something </Box>)}
          </Flex>
      </Flex>
    </Flex>
  )
}

export default Create
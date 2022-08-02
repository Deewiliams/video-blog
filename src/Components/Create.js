import { useColorModeValue, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Flex, Input, Menu, MenuButton, MenuList, MenuItem,Button,Text } from '@chakra-ui/react';
import { IoChevronDown } from 'react-icons/io5';
import { categories } from '../data';

const Create = () => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.50");

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Choose category')

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
                 <MenuItem key={category.id} _hover={{bg: 'blackAlph.300'}}
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
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Create
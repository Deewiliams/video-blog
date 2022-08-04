import { useColorModeValue, useColorMode, FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Flex, Input, Menu, MenuButton, MenuList, MenuItem, Button, Text, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react';
import { IoCheckmark, IoChevronDown, IoCloudUpload, IoLocation, IoTrash, IoWarning } from 'react-icons/io5';
import { categories } from '../data';
import Spinner from './Spinner';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { firebaseApp } from '../firebase';
import AlertMessage from './AlertMessage';
import { fetchUserInfo } from "../Utils/FetchUser"
import { setDoc, getFirestore, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.900", "gray.50");

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('Choose category')
  const [videoAsset, setVideoAsset] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [alert, setAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertIcon, setAlertIcon] = useState(null)
  const [description, setDescription] = useState('')

  const [userInfo] = fetchUserInfo()
  const navigate = useNavigate()

  const storage = getStorage(firebaseApp)
  const firebaseDb = getFirestore(firebaseApp)

  const uploadImage = (e) => {
    setLoading(true)
    const videoFile = e.target.files[0]

    const storageRef = ref(storage, `videos/${Date.now()}-${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);
    uploadTask.on('state_change', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(uploadProgress)
    }, (error) => {
      console.log(error);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setVideoAsset(downloadURL);
        setLoading(false);
        // setAlert(true);
        setAlertStatus('Success');
        setAlertIcon(<IoCheckmark fontSize={25} />);
        setAlertMsg('Your video is uploaded');
      })

    })
  }

  const deleteVideo = () => {
    const deleteRef = ref(storage, videoAsset)
    deleteObject(deleteRef).then(() => {
      setVideoAsset(null)
      setAlert(true)
      setAlertStatus('error')
      setAlertIcon(<IoWarning fontSize={25} />)
      setAlertMsg('Your video was removed')
      setTimeout(() => {
        setAlert(false)
      }, 4000)
    }).catch((error) => {
      throw(error);
    })
  }

  const uploadDetails = async () => {
    try {
      setLoading(true)
      if (!title && !category && !videoAsset) {
        setAlert(true)
        setAlertStatus('error')
        setAlertIcon(<IoWarning fontSize={25} />)
        setAlertMsg('Required fields are missing!')
        setTimeout(() => {
          setAlert(false)
        }, 4000)
        setLoading(false)
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          userId: userInfo?.uid,
          category: category,
          location: location,
          videoUrl: videoAsset,
          description: description
        }
        await setDoc(doc(firebaseDb, 'videos', `${Date.now()}`), data)
        setLoading(false)
        navigate('/', { replace: true })
      }
    } catch (error) {
      throw(error);
    }
  }




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

        {alert && (
          <AlertMessage status={alertStatus} msg={alertMsg} icon={alertIcon} />
        )}
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
              children={<IoLocation fontSize={25} color={`${colorMode === "dark" ? "#f1f1f1" : "#111s"}`} />}
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
                  <Spinner msg={'Uploading Your Video'} progress={progress} />
                ) : (
                  <>
                    <IoCloudUpload fontSize={30} color={`${colorMode === "dark" ? "#f1f1f1" : "#111s"}`} />
                    <Text mt={5} fontSize={20} color={textColor}>
                      Click to upload
                    </Text>
                  </>)}
              </Flex>
            </Flex>
            {
              !loading && (
                <Input
                  type={'file'}
                  name='upload-image'
                  onChange={uploadImage}
                  style={{ width: 0, height: 0 }}
                  accept="video/mp4,video/x-m4v,video/*"

                />
              )
            }
          </FormLabel> : (
            <Flex
              width={'full'}
              height='full'
              justifyContent={'center'}
              alignItems='center'
              bg="black"
              position={'relative'}
            >
              <Flex
                width={'40px'}
                height='40px'
                justifyContent={'center'}
                alignItems='center'
                bg="red"
                position={'absolute'}
                top={5}
                right={5}
                cursor={"pointer"}
                zIndex={10}
                rounded='full'
                onClick={deleteVideo}
              >
                <IoTrash fontSize={20} color='white' />
              </Flex>
              <video
                src={videoAsset}
                controls
                style={{ width: '100%', height: '100%' }}
              />
            </Flex>
          )}
        </Flex>
        <Flex
          width={'full'}
          height='full'
          justifyContent={'center'}
          alignItems='center'
          position={'relative'}
        >
          <Textarea
            placeholder='Enter the video description'
            size='sm'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Flex>
        <Button isLoading={loading} loadingText='uploading' colorScheme={"linkedin"}
          variant={`${loading ? 'outline' : 'solid'}`}
          width={'xl'}
          _hover={{ shadow: 'lg' }}
          fontSize={20}
          onClick={() => uploadDetails()}
        >
          Upload
        </Button>
      </Flex>
    </Flex>
  )
}

export default Create
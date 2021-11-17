import 'tailwindcss/tailwind.css'
import { useDisclosure } from '@chakra-ui/hooks'
import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import Head from 'next/head'
import { useState } from 'react'
import ServiceModal from '../containers/services-modal'
import ServiceGrid from '../containers/services-grid/index'
import { services } from '../constants/services';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [service, setService] = useState(null)

  const itemOpened = (item) => {
    setService(item)
    onOpen()
  }
  return (
    <>
      <Head>
        <title>Cnnctr.io</title>
        <meta
          name="description"
          content="Simplify data access to your cloud data sources, simplify your microservices by reducing overhead and resource complexities, easy pricing"
        />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <Flex flexDirection="column" 
      // bgColor="#14203080"
      >
        <Container p="10" textAlign={['left', 'center']} color="white">
          <Text fontSize="4xl" fontWeight="900">
            Cnnctr.io
          </Text>
        </Container>
        <Container  
        // color="white"
        >
          <Box  p={[2, 5]} borderRadius="10" >
            <VStack>
              <Text fontWeight="extrabold">App ID: </Text>
              <Text>ypgt8pnahco07clpf6j78</Text>
            </VStack>
            <VStack mt={25}>
              <Text fontWeight="extrabold" p={0}>
                Server API Key:{' '}
              </Text>
              <Text m={0} p={0}>
                2cc9f640-0481-429d-8199-ff8bd108f438
              </Text>
            </VStack>
          </Box>
        </Container>
        <Box w="90%" my={50} mx="auto" pb={50} 
        // bgColor="#f9f9f9" 
        borderRadius={50} shadow="md">
          <Center>
            <VStack>
              <Text fontWeight="extrabold" py={50}>
                Available services:
              </Text>
              <ServiceGrid services={services} itemOpened={itemOpened} />
            </VStack>
          </Center>
        </Box>
      </Flex>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        scrollBehavior="inside"
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent  w="65%">
          <ModalHeader>
            <HStack>
              <ModalCloseButton />
              <Text>{service?.name}</Text>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <ServiceModal service={service}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export async function getServerSideProps() {
  return  {redirect: {
    permanent: false,
    destination: `/platform/data-sources/${services[0].service}`
  }}
}
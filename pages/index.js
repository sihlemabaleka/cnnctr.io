import 'tailwindcss/tailwind.css'
import {useDisclosure} from '@chakra-ui/hooks'
import {
    Container,
    Flex,
    HStack,
    Text,
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
import {useEffect, useState} from 'react'
import ServiceModal from '../containers/services-modal'
import Cookies from "cookies";
import {QueryClient, useQuery} from "react-query";
import {fetchMe} from "../api/API";
import {dehydrate} from "react-query/hydration";
import axios from "axios";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter()

    const {data: user, error, isLoading, isFetching} = useQuery("me", fetchMe);


    useEffect(() => {
        if (user) {
            if (!isLoading && !isFetching && user.error) {
                signOut().then(changRoute)
            }
        }

        console.log(user)
        console.log(error)
    }, [user, error])

    const signOut = async () => await axios.post("/api/auth/sign-out")

    const changRoute = async () =>
        await router.replace("/auth/sign-in")

    const {isOpen, onOpen, onClose} = useDisclosure()

    const [service, setService] = useState(null)

    const itemOpened = (item) => {
        setService(item)
        onOpen()
    }
    return (
        <>
            <Head>
                <title>GoBetween.io</title>
                <meta
                    name="description"
                    content="Simplify data access to your cloud data sources, simplify your microservices by reducing overhead and resource complexities, easy pricing"
                />
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <>
                <Flex
                    flexDirection="column"
                    alignContent={"center"}
                    alignItems={"center"}
                >
                    <Container flex={1}
                               bgColor="#14203080" textAlign={"center"}>
                        <Text>
                            Welcome
                        </Text>
                    </Container>
                </Flex>

            </>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                closeOnOverlayClick={false}
                scrollBehavior="inside"
                isCentered
                size="xl"
            >
                <ModalOverlay/>
                <ModalContent w="65%">
                    <ModalHeader>
                        <HStack>
                            <ModalCloseButton/>
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


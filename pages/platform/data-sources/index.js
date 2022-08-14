import React, {useEffect, useState} from 'react';
import {services} from '../../../constants/services';
import Layout from '../../../components/Layout';
import {Box, Text, HStack, Flex} from '@chakra-ui/layout';

import {Link, useDisclosure} from '@chakra-ui/react';
import ServiceModal from '../../../containers/services-modal';

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/modal'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    SimpleGrid,
} from "@chakra-ui/react"
import {useBreakpointValue} from "@chakra-ui/react"
import {Button} from '@chakra-ui/button';
import Sidebar from '../../../components/Sidebar';
import {useQuery} from "react-query";
import {fetchMe} from "../../../api/API";
import axios from "axios";
import {useRouter} from "next/router";

const ServicePage = () => {
    const router = useRouter()

    const [service, setService] = useState(services.filter((value) => value.service === (router.query.service || 'aws_dynamodb'))[0])
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose} = useDisclosure()

    const {data: user, error, isLoading, isFetching, } = useQuery("me", async () => await fetchMe());


    React.useEffect(() => {
        if (user)
            if (user?.error)
                callAxios("/api/auth/sign-out").then(async (response) => await changRoute("/auth/sign-in"))

    }, [user, error])

    const callAxios = async (url) => await axios.post(url)

    const changRoute = async (url) =>
        await router.replace(url)

    const menuRef = React.useRef()
    const size = useBreakpointValue(['full', 'xl'])

    const itemOpened = () => {
        onOpen()
    }

    useEffect(() => {
        if(router?.query?.service) {
            const incoming = services.filter((value) => value.service === router.query.service)[0]
            if(incoming.service !== service.service) {
                setService(incoming)
            }
        }
    }, [router])

    return (
        <>
            <Layout
                services={services}
                selected_service={service?.service}
                title={service?.name}
                itemOpened={itemOpened}
                menuRef={menuRef}
                onDrawerOpen={onDrawerOpen}
                page="data-sources"
                base_path={'/platform/data-sources'}
            >
                <Box>
                    <Text>
                        <p>Page: {service?.name}</p>
                    </Text>
                </Box>
                <Modal
                    onClose={onClose}
                    isOpen={isOpen}
                    closeOnOverlayClick={false}
                    scrollBehavior="inside"
                    isCentered
                    size={size}
                >
                    <ModalOverlay/>
                    <ModalContent minW="65%">
                        <ModalHeader>
                            <HStack>
                                <ModalCloseButton/>
                                <Text>{service?.name}</Text>
                            </HStack>
                        </ModalHeader>
                        <ModalBody>
                            <Flex flexDirection={"column"}>
                                <ServiceModal flex={'1'} onClose={onClose} service={service}
                                              path={"/api/credentials/insert"}/>
                                <Button variant="ghost" mr={3} onClick={onClose}>
                                    Close
                                </Button>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                <Drawer
                    isOpen={isDrawerOpen}
                    placement="right"
                    onClose={onDrawerClose}
                    finalFocusRef={menuRef}
                >
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerCloseButton mt={2}/>
                        <DrawerHeader>Menu</DrawerHeader>

                        <DrawerBody>
                            <SimpleGrid columns={1} spacing={2} mb={5}>
                                <Link href={'/platform/data-sources/aws_dynamodb'}>
                                    <Button
                                        variant="solid"
                                        fontSize="xs"
                                        w={"100%"}
                                        // color="#2a2a2a"
                                    >

                                        Data Sources
                                    </Button>
                                </Link>
                                <Link href={'/platform/auth-providers/google'}>
                                    <Button variant="outline" fontSize="xs" w={"100%"}
                                        // color="#2a2a2a"
                                    >
                                        Auth Providers
                                    </Button>
                                </Link>
                                <Button variant="outline" fontSize="xs"
                                    // color="#2a2a2a"
                                >
                                    Settings
                                </Button>
                            </SimpleGrid>

                            <Sidebar onDrawerClose={onDrawerClose}
                                     base_path={'/platform/data-sources'}
                                     columnCount={2}
                                     services={services}
                                     page="data-sources"
                                     selected_service={service?.service}/>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Layout>
        </>
    );
};

export default ServicePage;

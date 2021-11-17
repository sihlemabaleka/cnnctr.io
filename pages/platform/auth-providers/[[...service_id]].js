import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import Layout from '../../../components/Layout';
import {Box, Text, HStack, Flex} from '@chakra-ui/layout';
import supabase from '../../../hooks/useSupabase';
import {Link, useDisclosure} from '@chakra-ui/react';
import ServiceModal from '../../../containers/services-modal/index';
import {auth_providers_list} from '../../../constants/auth_providers_list';

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
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

const ServicePage = ({service: selectedService}) => {
    const router = useRouter()

    const [service, setService] = useState(selectedService);


    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose} = useDisclosure()

    const menuRef = React.useRef()
    const size = useBreakpointValue(['full', null, 'xl'])

    useEffect(() => {
        const service_id = router.query.service_id
        if (service_id)
            setService(auth_providers_list.filter(serv => serv.service === service_id)[0])
    }, [router.query.service_id])

    const itemOpened = () => {
        onOpen()
    }

    useEffect(() => {

    }, [router.pathname])

    return (
        <>
            <Layout
                services={auth_providers_list}
                selected_service={service?.service}
                title={service?.name}
                itemOpened={itemOpened}
                menuRef={menuRef}
                onDrawerOpen={onDrawerOpen}
                page="auth-providers"
                base_path={'/platform/auth-providers'}
            >
                <Box>
                    <Text>
                        <p>Page: {service.name}</p>
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
                                <ServiceModal flex={'1'}
                                              onClose={onClose} service={service} />
                                <Button variant="ghost" mr={3} onClick={onClose}>
                                    Close
                                </Button>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
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
                                <Button
                                    variant="outline"
                                    fontSize="xs"
                                    // color="#2a2a2a"
                                >
                                    <Link href={'/platform/data-sources'}>
                                        Data Sources
                                    </Link>
                                </Button>
                                <Button variant={"solid"} fontSize="xs"
                                    // color="#2a2a2a"
                                >
                                    <Link href={'/platform/auth-providers'}>
                                        Auth Providers
                                    </Link>
                                </Button>
                                <Button variant="outline" fontSize="xs"
                                    // color="#2a2a2a"
                                >
                                    Settings
                                </Button>
                            </SimpleGrid>

                            <Sidebar onDrawerClose={onDrawerClose} columnCount={2} services={auth_providers_list}
                                     selected_service={service.service}
                                     base_path={'/platform/auth-providers'}/>
                        </DrawerBody>

                        {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
                    </DrawerContent>
                </Drawer>
            </Layout>
        </>
    );
};


export async function getServerSideProps({req, query}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    const {service_id} = query


    let service;

    if (service_id) {
        service = auth_providers_list.filter(value => value.service === service_id)[0];
    } else {
        return {
            redirect: {
                permanent: false,
                destination: `/platform/auth-providers/${auth_providers_list[0].service}`
            }
        }
    }

    if (!user) {
        return {
            props: {
                service,
                user
            },
        }
    }

    /* if user is present, do something with the user data here */
    return {props: {service}}
}

export default ServicePage;

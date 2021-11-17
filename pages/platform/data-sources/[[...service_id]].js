import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react';
import {services} from '../../../constants/services';
import Layout from '../../../components/Layout';
import {Box, Text, HStack, Flex} from '@chakra-ui/layout';
import supabase from '../../../hooks/useSupabase';
import {Link, useDisclosure} from '@chakra-ui/react';
import ServiceModal from '../../../containers/services-modal/index';

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

const ServicePage = (props) => {
    const router = useRouter()

    const [service, setService] = useState(props.service);


    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose} = useDisclosure()

    const menuRef = React.useRef()
    const size = useBreakpointValue(['full', 'xl'])

    useEffect(() => {
        const service_id = router.query.service_id
        if (service_id)
            setService(services.filter(serv => serv.service === service_id)[0])
    }, [router.query.service_id])

    const itemOpened = () => {
        onOpen()
    }


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
                            <ServiceModal  flex={'1'} onClose={onClose} service={service} />
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
                                <Link href={'/platform/data-sources'}>
                                <Button
                                    variant="solid"
                                    fontSize="xs"
                                    w={"100%"}
                                    // color="#2a2a2a"
                                    >

                                        Data Sources
                                </Button>
                                </Link>
                                <Link href={'/platform/auth-providers'}>
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
                                     selected_service={service.service}/>
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
        service = services.filter(value => value.service === service_id)[0];
    } else {
        return {
            redirect: {
                permanent: false,
                destination: `/platform/data-sources/${services[0].service}`
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

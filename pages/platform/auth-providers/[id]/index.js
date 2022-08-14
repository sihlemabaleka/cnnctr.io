import React from 'react';
import Layout from '../../../../components/Layout';
import {Box, Text, HStack, Flex} from '@chakra-ui/layout';
import {Link, useDisclosure} from '@chakra-ui/react';
import ServiceModal from '../../../../containers/services-modal';
import {auth_providers_list} from '../../../../constants/auth_providers_list';

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
import Sidebar from '../../../../components/Sidebar';

const ServicePage = ({service}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose} = useDisclosure()

    const menuRef = React.useRef()
    const size = useBreakpointValue(['full', null, 'xl'])


    const itemOpened = () => {
        onOpen()
    }

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
                                              onClose={onClose} service={service}  path={"/api/providers/insert"}/>
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
                                <Link href={'/platform/data-sources/aws_dynamodb'}>
                                    <Button
                                        variant="outline"
                                        fontSize="xs"
                                        w={"100%"}>
                                        Data Sources
                                    </Button>
                                </Link>
                                <Link href={'/platform/auth-providers/google'}>
                                    <Button
                                        variant={"solid"}
                                        fontSize="xs"
                                        w={"100%"}
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


export async function getStaticProps({params}) {
    return {
        props: {
            service: auth_providers_list.filter((value) => value.service === params.id)[0],
        },
    }
}


export function getStaticPaths() {

    const paths = auth_providers_list.map(({service}) => ({
        params: {
            id: service
        },
    }))
    return {paths, fallback: false}
}

export default ServicePage;

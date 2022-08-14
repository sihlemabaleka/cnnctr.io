import {AspectRatio, VStack, Box, Text, Flex, Center} from '@chakra-ui/layout';
import {FaPlus} from 'react-icons/fa';
import {motion} from 'framer-motion';

import {Icon} from '@chakra-ui/react';
import {fadeInUp} from '../../../animations/Animations.framer';
import {useDisclosure} from '@chakra-ui/hooks';
import CreateAppModal from '../../../containers/create-app-modal/index';
import {QueryClient, useQuery} from "react-query";
import {fetchMe} from "../../../api/API";
import Cookies from "cookies";
import {dehydrate} from "react-query/hydration";
import {useEffect} from "react";

const CreateAppPage = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const {user} = useQuery('me', fetchMe)

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <motion.div initial="initial" animate="animate">
            <Flex flexDirection="column">
                <Box p="4" align="center">
                    <motion.div variants={fadeInUp}>
                        <Text fontSize="xl" fontWeight="900">
                            GoBetween
                        </Text>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <Text fontSize="xs">
                            Simple access to all your cloud datasources.
                        </Text>
                    </motion.div>
                </Box>
                <Center mt="50px">
                    <Box w="75%" align="center">
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <AspectRatio
                                maxW="200px"
                                ratio="1"
                                shadow="xl"
                                borderRadius="20px"
                                border="1px solid gray.200"
                                className="cursor-pointer"
                                onClick={onOpen}
                            >
                                <VStack>
                                    <Icon as={FaPlus}/>
                                    <Text fontWeight="extrabold">Add A New App</Text>
                                </VStack>
                            </AspectRatio>
                        </motion.div>
                    </Box>
                </Center>
            </Flex>
            <CreateAppModal isOpen={isOpen} onClose={onClose} avatarUrl=""/>
        </motion.div>
    );
};

export async function getServerSideProps({req, res}) {
    // Create a cookies instance
    const cookies = new Cookies(req, res)
    // Get a cookie
    const accessToken = cookies.get('session')

    if (accessToken) {

        const queryCache = new QueryClient()
        await queryCache.prefetchQuery('me', () => fetchMe(accessToken))

        return {
            props: {
                dehydratedState: dehydrate(queryCache),
            }
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: `/auth/sign-in`
            }
        }
    }
}

export default CreateAppPage;

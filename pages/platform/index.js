import {
    AspectRatio,
    VStack,
    Box,
    Text,
    Flex,
    Center
} from '@chakra-ui/layout'
import {useState} from 'react'
import {FaPlus} from 'react-icons/fa'
import {motion} from 'framer-motion'

import {
    Icon
} from '@chakra-ui/react'

import {useDisclosure} from '@chakra-ui/react'
import supabase from '../../hooks/useSupabase'
import Layout from '../../components/Layout';
import {fadeInUp} from '../../animations/Animations.framer';
import CreateAppModal from '../../containers/create-app-modal/index';
import {services} from '../../constants/services';


const PlatformPage = () => {


    const [isAuthenticated] = useState(false)

    const {isOpen, onOpen, onClose} = useDisclosure()


    if (!isAuthenticated) {
        return (
            <motion.div initial="initial" animate="animate">
                <Flex flexDirection="column">
                    <Box p="4" align="center">
                        <motion.div variants={fadeInUp}>
                            <Text fontSize="xl" fontWeight="900">
                                ConnectorIO
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
                            <motion.div variants={fadeInUp}
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                            >
                                <AspectRatio maxW="200px" ratio="1" shadow="xl" borderRadius="20px"
                                             border="1px solid gray.200" className="cursor-pointer"
                                             onClick={onOpen}>
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
        )
    }
    return (
        <>
            <Layout services={services}>
                <Box>
                    <Text>
                        NextJS
                    </Text>
                </Box>
            </Layout>
        </>
    )
}

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)


    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: `/platform/data-sources/${services[0].service}`
            }
        }
    }

    /* if user is present, do something with the user data here */
    return {props: {user}}
}

export default PlatformPage

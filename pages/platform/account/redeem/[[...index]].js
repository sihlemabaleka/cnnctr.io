import {useEffect, useState} from 'react'
import {
    Flex,
    Heading,
    Button,
    Stack,
    Link,
    VStack,
    Text,
    Container,
    PinInput, PinInputField
} from '@chakra-ui/react'

import {HStack} from "@chakra-ui/layout";
import {QueryClient, useQuery} from "react-query";
import {fetchMe} from "../../../../api/API";
import Cookies from "cookies";
import {dehydrate} from "react-query/hydration";

const EarlyAccessPage = ({user}) => {


    const [showPassword, setShowPassword] = useState(true)

    const handleShowClick = () => setShowPassword(!showPassword)

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            // backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Container>
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                    spacing={20}
                >
                    {/* <Avatar bg="teal.500" /> */}
                    <VStack>
                        <Heading fontWeight="900" color="teal.400">
                            GoBetween.io
                        </Heading>
                        <Text align={['center', 'left']}>Connect to all your cloud datasource from here.</Text>
                    </VStack>
                    <Text>Please enter your subscription code.</Text>
                    <HStack>
                        <PinInput size="lg">
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                        </PinInput>
                    </HStack>
                    <Link href={"/platform/apps"}>

                        <Button size={"lg"} variant={"solid"} fontWeight={'900'} px={20}>
                            Continue
                        </Button>
                    </Link>

                </Stack>

            </Container>
            <Button variant={"ghost"} mt={20}>
                Sign out
            </Button>
        </Flex>
    )
}


export async function getServerSideProps({req, res}) {
    // Create a cookies instance
    const cookies = new Cookies(req, res)
    // Get a cookie
    const accessToken = cookies.get('session')

    // Validate accessToken


    if (accessToken) {
        const queryCache = new QueryClient()
        await queryCache.prefetchQuery('me', () => fetchMe(accessToken))

        return {
            props: {
                dehydratedState: dehydrate(queryCache),
                user: {}
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

export default EarlyAccessPage

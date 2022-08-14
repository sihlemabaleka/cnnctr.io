import {Center, Container, Flex, Text, VStack} from '@chakra-ui/layout'
import {Button} from '@chakra-ui/button'
import {Link} from "@chakra-ui/react";
import Cookies from "cookies";

const ConfirmUser = () => {
    return (
        <>
            <Flex>
                <Container flex="1">
                    <Center>
                        <VStack>
                            <Text>You have logged in, if you see this message</Text>
                            <Link>
                                <Button>Go To Home</Button>
                            </Link>
                        </VStack>
                    </Center>
                </Container>
            </Flex>
        </>
    )
}


export async function getServerSideProps({req, res}) {
    // Create a cookies instance
    const cookies = new Cookies(req, res)
    // Get a cookie
    const accessToken = cookies.get('session')

    if (accessToken) {

        return {
            redirect: {
                permanent: false,
                destination: `/platform`
            }
        }
    }
}


export default ConfirmUser

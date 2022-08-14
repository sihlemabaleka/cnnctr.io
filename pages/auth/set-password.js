import {Box, Flex, Spacer, Text, VStack} from "@chakra-ui/layout";
import {motion} from "framer-motion";
import {fadeInUp} from "../../animations/Animations.framer";
import {FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react";
import {Button} from "@chakra-ui/button";
import {useMutation} from "react-query";
import {setPassword} from "../../api/API";
import Cookies from "cookies";

const SetPasswordPage = () => {

    const [mutate, { isIdle, isLoading, isError, isSuccess, data, error }] = useMutation(setPassword)

    const handleSubmit = async (values) => {

        try{
            await mutate(values)
        }catch (e) {
            console.log(error)
        }
    }

    return (
        <Flex h={"100vh"} py="auto" flexDirection={"column"} alignItems={"center"} alignContent={"center"}>
            <Spacer/>
            <VStack spacing={20}>
                <Box p="4" align="center">
                    <motion.div variants={fadeInUp}>
                        <Text fontSize="xl" fontWeight="900">
                            GoBetween
                        </Text>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <Text fontSize="xs">
                            Simple access to all your cloud data sources.
                        </Text>
                    </motion.div>
                </Box>
                <VStack>
                    <FormControl id="password">
                        <FormLabel textAlign={"center"}>Password</FormLabel>
                        <Input type="password"/>
                        <FormHelperText>{'We don\'t store your password in plain-text.'}</FormHelperText>
                    </FormControl>
                </VStack>
                <VStack w={"100%"} spacing={10}>
                    <Button size={"lg"}>
                        Update Password
                    </Button>
                    <Button size={"sm"} variant={"link"}>Forgot password?</Button>
                </VStack>
            </VStack>
            <Spacer/>
        </Flex>
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

export default SetPasswordPage
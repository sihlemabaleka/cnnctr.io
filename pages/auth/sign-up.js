import {Box, Flex, Spacer, Text, VStack} from "@chakra-ui/layout";
import {motion} from "framer-motion";
import {fadeInUp} from "../../animations/Animations.framer";
import {FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react";
import {Button} from "@chakra-ui/button";
import {useMutation} from "react-query";
import {signUp} from "../../api/API";
import axios from "axios";
import {useForm} from "react-hook-form";
import Cookies from "cookies";

const SignUpPage = () => {

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();


    async function onSubmit(values) {
        const {email, password, data} = values;
        const response = await axios.post("/api/auth/sign-up", {email, password, data});

    }

    return (
        <Flex h={"100vh"} py="auto" flexDirection={"column"} alignItems={"center"} alignContent={"center"}>
            <Spacer/>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <VStack spacing={5}>
                        <FormControl>
                            <FormLabel textAlign={"center"}>Full names</FormLabel>
                            <Input id={"fullnames"} type="text"
                                   {...register("fullnames", {
                                       required: "This is required",
                                       minLength: {value: 4, message: "Minimum length should be 4"}
                                   })}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel textAlign={"center"}>Organisation</FormLabel>
                            <Input id={"organisation"} type="text"
                                   {...register("organisation", {
                                       required: "This is required",
                                       minLength: {value: 4, message: "Minimum length should be 4"}
                                   })}/>
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel textAlign={"center"}>Email</FormLabel>
                            <Input id={"email"} type="email"
                                   {...register("email", {
                                       required: "This is required",
                                       minLength: {value: 4, message: "Minimum length should be 4"}
                                   })}/>
                            <FormHelperText>{'We\'ll never share your email.'}</FormHelperText>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel textAlign={"center"}>Password</FormLabel>
                            <Input id="password" type="password"
                                   {...register("password", {
                                       required: "This is required",
                                       minLength: {value: 4, message: "Minimum length should be 4"}
                                   })}/>
                            <FormHelperText>{'We don\'t store your password in plain-text.'}</FormHelperText>
                        </FormControl>
                    </VStack>
                    <VStack w={"100%"} spacing={10}>
                        <Button size={"lg"} type={"submit"}>
                            Sign Up
                        </Button>
                        <Button size={"sm"} variant={"link"}>Forgot password?</Button>
                    </VStack>
                </VStack>
            </form>
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

export default SignUpPage
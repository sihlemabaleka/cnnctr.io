import {Box, Flex, HStack, Spacer, Text, VStack} from "@chakra-ui/layout";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Input,
} from "@chakra-ui/react"
import {Button} from "@chakra-ui/button";
import {motion} from "framer-motion";
import {fadeInUp} from "../../animations/Animations.framer";
import useAuth from "../../hooks/useGoBetweenAuth";
import {QueryClient, useMutation, useQuery} from "react-query";
import {useForm} from "react-hook-form";
import axios from "axios";
import Cookies from "cookies";
import {fetchMe} from "../../api/API";
import {dehydrate} from "react-query/hydration";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";


const {signIn} = useAuth;

const SignInPage = () => {
    const router = useRouter()
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    const {data: _user, error} = useQuery("me", fetchMe);


    async function onSubmit(values) {
        const response = await axios.post("/api/auth/sign-in", values);
        if (response) {
            const {data, ...rest} = response;
            console.log(data)
            if (data.error) {
                alert(data.error.message)
                return
            }
            await axios.post("/api/auth/token", {session: data}).then(() => changeRoute("/platform"));
        }
    }

    const changeRoute = async (route) => {
        return await router.replace(route);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={10}>
                        <FormControl isInvalid={errors['email']}>
                            <FormLabel textAlign={"center"} htmlFor="email">Email</FormLabel>
                            <Input id={"email"} type="email"
                                   {...register("email", {
                                       required: "This is required",
                                       minLength: {value: 4, message: "Minimum length should be 4"}
                                   })}/>
                            <FormErrorMessage>
                                {errors['email'] && errors['email']?.message}
                            </FormErrorMessage>
                            <FormHelperText>{'We\'ll never share your email.'}</FormHelperText>
                        </FormControl>
                        <FormControl isInvalid={errors['password']}>
                            <FormLabel textAlign={"center"}>Password</FormLabel>
                            <Input id="password" type="password"
                                   {...register("password", {
                                       required: "This is required",
                                       minLength: {value: 4, message: "Minimum length should be 4"}
                                   })}/>
                            <FormErrorMessage>
                                {errors['password'] && errors['password']?.message}
                            </FormErrorMessage>
                            <FormHelperText>{'We don\'t store your password in plain-text.'}</FormHelperText>
                        </FormControl>
                    </VStack>
                    <VStack w={"100%"} spacing={10}>
                        <Button size={"lg"} type={"submit"}>
                            Sign in
                        </Button>
                        <Button size={"sm"} variant={"link"}>Forgot password?</Button>
                    </VStack>
                </form>
            </VStack>
            <Spacer/>
        </Flex>
    )
}


export default SignInPage
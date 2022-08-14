import { useState } from 'react'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  VStack,
  FormControl,
  Text,
  FormHelperText,
  InputRightElement,
  Container,
  PinInput, PinInputField
} from '@chakra-ui/react'

import { FaUserAlt, FaLock } from 'react-icons/fa'
import {HStack} from "@chakra-ui/layout";
import {useMutation} from "react-query";
import {resetPassword} from "../../api/API";

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const EarlyAccessPage = () => {


  const [mutate, {isIdle, isLoading, isError, isSuccess, data, error}] = useMutation(resetPassword)

  const handleSubmit = async (values) => {

    try {
      await mutate(values)
    } catch (e) {
      console.log(error)
    }
  }

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
          <Text>Connect to all your cloud datasource from here.</Text>
        </VStack>
        <Text>Please enter your early access code.</Text>
        <HStack>
          <PinInput size="lg">
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button size={"lg"} variant={"solid"}>
          Redeem Account
        </Button>

      </Stack>

      </Container>
    </Flex>
  )
}

export default EarlyAccessPage

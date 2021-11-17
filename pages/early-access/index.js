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
} from '@chakra-ui/react'

import { FaUserAlt, FaLock } from 'react-icons/fa'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const EarlyAccessPage = () => {

  const [showPassword, setShowPassword] = useState(true)

  const handleShowClick = () => setShowPassword(!showPassword)

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
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
            Connector.io
          </Heading>
          <Text>Connect to all your cloud datasource from here.</Text>
        </VStack>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form>
            <Stack
              spacing={10}
              p="2rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius="20"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    icon={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    icon={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Invite Code"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>{'Didn\'t receive an invite code?'}</Link>
                </FormHelperText>
              </FormControl>
              <Container align="center">
                <Button
                  borderRadius={50}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  px={10}
                  // width="full"
                  fontWeight="900"
                >
                  Redeem
                </Button>
              </Container>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default EarlyAccessPage

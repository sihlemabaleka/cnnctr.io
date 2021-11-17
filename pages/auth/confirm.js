import { Center, Container, Flex, Text, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

const ConfirmUser = () => {
  return (
    <>
      <Flex>
        <Container flex="1">
          <Center>
            <VStack>
              <Text>You have logged in, if you see this message</Text>
              <Button>Go To Home</Button>
            </VStack>
          </Center>
        </Container>
      </Flex>
    </>
  )
}



export default ConfirmUser

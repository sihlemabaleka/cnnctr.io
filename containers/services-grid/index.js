import { Button } from '@chakra-ui/button'
import Image from 'next/image'
import { Box, Container, SimpleGrid, Text, VStack } from '@chakra-ui/layout'

const ServiceGrid = ({ services = [], itemOpened }) => {

  const openModal = (item) => {
    if (item) {
        itemOpened(item)
    }
  }
  return (
    <SimpleGrid columns={[1, null, 3]} spacing="20px">
      {services.map((service, index) => {
        return (
          <Box
            key={index}
            borderRadius="5"
            maxW="350px"
            // bgColor="white"
            py={20}
            _hover={{
              shadow: 'md',
              cursor: 'pointer',
            }}
          >
            <VStack spacing="12px">
              <Image
                src={service?.image}
                alt={service?.name}
                width={50}
                height={50}
                objectFit="scale-down"
              />
              <Text fontWeight="extrabold">{service?.name}</Text>
              <Container>
                <Text fontSize="base" align="center" noOfLines={3}>
                  {service?.description}
                </Text>
              </Container>
              <Button
                colorScheme="orange"
                size="md"
                fontWeight="extrabold"
                onClick={() => openModal(service)}
              >
                View
              </Button>
            </VStack>
          </Box>
        )
      })}
    </SimpleGrid>
  )
}

export default ServiceGrid

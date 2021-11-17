import { Box, Heading, Flex, Spacer } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

const Page = ({title = 'AWS DynamoDB', children, itemOpened}) => {
  return (
    <Flex h="100%" flexDirection="column" px="20px" py="10px">
      <Box py="10px">
        <Flex flexDirection={['column', 'row']}>
          <Heading fontWeight="extrabold">{title}</Heading>
          <Spacer />
        </Flex>
      </Box>
      <Box>
        <Flex flexDirection="row">
          <Button variant="solid" borderRadius="20px" onClick={itemOpened}>App Settings</Button>
          <Spacer />
          <Button variant="ghost" borderRadius="20px" fontSize="xs">Report an issue</Button>
        </Flex>
      </Box>
      <Box flex="1" 
      // bg="#fafafa" 
      p="10px" >
        {children}
      </Box>
    </Flex>
  );
};

export default Page;

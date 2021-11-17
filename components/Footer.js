import {Container, SimpleGrid} from '@chakra-ui/layout';
import {Button} from '@chakra-ui/button';

const Footer = () => {
  return (
    <Container py="10px" d={['none', 'inherit']}>
      <SimpleGrid columns={[3, 5]} spacing={[5, 20]} >
        <Button variant="link" fontSize="xs" 
        // color="#2a2a2a"
        >
          About
        </Button>
        <Button variant="link" fontSize="xs" 
        // color="#2a2a2a"
        >
          Platform
        </Button>
        <Button variant="link" fontSize="xs" 
        // color="#2a2a2a"
        >
          Documentation
        </Button>
        <Button variant="link" fontSize="xs" 
        // color="#2a2a2a"
        >
          Pricing
        </Button>
        <Button variant="link" fontSize="xs" 
        // color="#2a2a2a"
        >
          Legal
        </Button>
      </SimpleGrid>
    </Container>
  );
};

export default Footer;

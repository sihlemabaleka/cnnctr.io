import {Box, Text, Flex, Spacer, SimpleGrid} from '@chakra-ui/layout';
import {Button, IconButton} from '@chakra-ui/button';
import {FaAlignRight} from 'react-icons/fa';
import {Link} from "@chakra-ui/react";

const Header = ({onDrawerOpen, page}) => {

    return (
        <Box mt="10px" maxW="90%" mx="auto">
            <Flex alignItems="center">
                <Box p="4">
                    <Text fontSize="xl" fontWeight="900">
                        GoBetween
                    </Text>
                    <Text fontSize="xs" d={{base: 'none', lg: 'initial'}}>
                        Simple access to all your cloud datasources.
                    </Text>
                </Box>
                <Spacer/>
                <Box>
                    <IconButton
                        // ref={menuRef}
                        onClick={onDrawerOpen}
                        p="4"
                        variant="ghost"
                        aria-label={'Menu'}
                        d={{base: 'initial', lg: 'none'}}
                        icon={<FaAlignRight/>}
                    />
                </Box>
                <Box p="4" d={{base: 'none', lg: 'initial'}}>
                    <SimpleGrid columns={[1, 3]} spacing={[10, 30]}>
                        <Link href={'/platform/data-sources'}>
                            <Button
                                variant={page === 'data-sources' ? "solid" : "outline"}
                                fontSize="xs"
                                // color="#2a2a2a"
                                w={"100%"}
                            >
                                Data Sources
                            </Button>
                        </Link>
                        <Link href={'/platform/auth-providers'}>
                            <Button
                                variant={page === 'auth-providers' ? "solid" : "outline"} w={"100%"} fontSize="xs"
                                // color="#2a2a2a"
                            >
                                Auth Providers
                            </Button>
                        </Link>
                        <Button variant="outline" fontSize="xs"
                            // color="#2a2a2a"
                        >
                            Settings
                        </Button>
                    </SimpleGrid>
                </Box>
            </Flex>
        </Box>
    );
};

export default Header;

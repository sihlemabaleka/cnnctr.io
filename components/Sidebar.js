import {
    AspectRatio,
    VStack,
    Text,
    Flex,
    SimpleGrid,
} from '@chakra-ui/layout';
import {Button} from '@chakra-ui/button';
import Image from 'next/image';
import {useRouter} from 'next/router';

const Sidebar = ({services, selected_service = 'aws_dynamodb', columnCount, onDrawerClose, base_path}) => {

    const router = useRouter()
    const handleClick = async (service_id) => {
        if (onDrawerClose) {
            onDrawerClose()
        }

        await router.push(`${base_path}?service=${service_id}`)
    }

    return (
        <>
            <Flex
                flexDirection="column"
                px={{base: 2.5, xl: 5}}
            >
                <Text my="10px" align="center" fontWeight="extrabold">
                    Select service:
                </Text>
                <SimpleGrid flex="1" columns={columnCount ? columnCount : {base: 1, xl: 2}} align="start" spacing={5}>
                    {services.map((service, index) => (
                        <AspectRatio
                            key={index} w="100%" ratio="1">
                            <Button
                                variant={
                                    selected_service === service.service ? 'solid' : 'outline'
                                }
                                isActive={selected_service === service.service}
                                // color="#2a2a2a"
                                fontSize="xs"
                                isFullWidth={true}
                                onClick={() => handleClick(service.service)}
                            >
                                <VStack spacing={3}>
                                    <Image src={service.image} {...{
                                        width: 30,
                                        height: 30,
                                        objectFit: "scale-down",
                                        alt: service.name
                                    }} />
                                    <Text>
                                        {service.name.replace('AWS', '').replace('Online', '')}
                                    </Text>
                                </VStack>
                            </Button>
                        </AspectRatio>
                    ))}
                </SimpleGrid>
            </Flex>
        </>
    );
};

export default Sidebar;

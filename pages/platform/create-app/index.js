import {AspectRatio, VStack, Box, Text, Flex, Center} from '@chakra-ui/layout';
import {FaPlus } from 'react-icons/fa';
import {motion} from 'framer-motion';

import {Icon} from '@chakra-ui/react';
import {fadeInUp} from '../../../animations/Animations.framer';
import {useDisclosure} from '@chakra-ui/hooks';
import CreateAppModal from '../../../containers/create-app-modal/index';

const CreateAppPage = () => {
  const {isOpen, onOpen, onClose} = useDisclosure ();
  return (
    <motion.div initial="initial" animate="animate">
      <Flex flexDirection="column">
        <Box p="4" align="center">
          <motion.div variants={fadeInUp}>
            <Text fontSize="xl" fontWeight="900">
              ConnectorIO
            </Text>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Text fontSize="xs">
              Simple access to all your cloud datasources.
            </Text>
          </motion.div>
        </Box>
        <Center mt="50px">
          <Box w="75%" align="center">
            <motion.div
              variants={fadeInUp}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
            >
              <AspectRatio
                maxW="200px"
                ratio="1"
                shadow="xl"
                borderRadius="20px"
                border="1px solid gray.200"
                className="cursor-pointer"
                onClick={onOpen}
              >
                <VStack>
                  <Icon as={FaPlus} />
                  <Text fontWeight="extrabold">Add A New App</Text>
                </VStack>
              </AspectRatio>
            </motion.div>
          </Box>
        </Center>
      </Flex>
      <CreateAppModal isOpen={isOpen} onClose={onClose} avatarUrl="" />
    </motion.div>
  );
};

export default CreateAppPage;

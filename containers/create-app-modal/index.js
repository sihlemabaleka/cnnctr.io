import {VStack, SimpleGrid} from '@chakra-ui/layout';
import {motion} from 'framer-motion';
import {fadeInUp} from '../../animations/Animations.framer';


import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react';

const CreateAppModal = ({isOpen, onClose}) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="65%" borderRadius={15} px={10}>
        <ModalHeader fontWeight="900" my="15px" align="center">
          <motion.div variants={fadeInUp}>
            Create A New App
          </motion.div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>

          <motion.div initial="initial" animate="animate">
            <VStack>
              <SimpleGrid columns={[1, 2]} spacing={5}>
                <motion.div variants={fadeInUp}>
                  <FormControl id="app_name">
                    <FormLabel>App Name</FormLabel>
                    <Input type="text" placeholder="Name of your app..." />
                    <FormHelperText>
                      {'Don\'t worry, you can edit everything later.'}
                    </FormHelperText>
                  </FormControl>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <FormControl id="app_url">
                    <FormLabel>App URL</FormLabel>
                    <InputGroup>
                      <InputLeftAddon icon="https://" />
                      <Input
                        type="text"
                        placeholder="This field is optional..."
                      />
                    </InputGroup>
                    <FormHelperText>
                      Please enter a valid address.
                    </FormHelperText>
                  </FormControl>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <FormControl id="app_description">
                    <FormLabel>App Description</FormLabel>
                    <Textarea placeholder="This field is optional..." />
                    <FormHelperText>
                      When in doubt, keep it simple.
                    </FormHelperText>
                  </FormControl>
                </motion.div>
              </SimpleGrid>
            </VStack>

          </motion.div>
        </ModalBody>

        <ModalFooter align="center">
          <Button colorScheme="green" mr={3} px="40px" fontWeight="extrabold">
            Save
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateAppModal;

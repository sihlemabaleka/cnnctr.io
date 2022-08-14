import {Button} from '@chakra-ui/button'
import {useForm} from 'react-hook-form'
import {Container, Flex, Spacer, Text} from '@chakra-ui/layout'
import {Tabs, Tab, TabList, TabPanels, TabPanel, Input, SimpleGrid} from '@chakra-ui/react'
import Image from 'next/image'
import {Select} from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react"
import credential_fields from "../../constants/cloud_credentials_field_values";
import axios from "axios";
import {useState} from "react";


const ServiceModal = ({
                          service,
                          onClose,
                          path
                      }) => {
    const [isLoading, setLoading]= useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()


    if (!service) {
        return <h1>Service not found</h1>
    }

    const onSubmit = async (data) => {
        setLoading(true)
        await axios.post(path, {service: service.service, ...data}).then(({data, error}) => {
            setLoading(false)
            if (error) return alert(error.message)
            onClose()
            return;
        })
    }

    return (
        <>
            <Flex flexDirection={["column"]} alignItems={["center"]} minW={"100%"} mx={"auto"}>
                <Image
                    src={service.image}
                    alt={service.name}
                    width={125}
                    height={125}
                    objectFit="scale-down"
                    // mx={20}
                />
                <Text align={['center']} mt={10}>{service.description}</Text>
            </Flex>
            <Tabs variant="enclosed" mt={25}>
                <TabList mb="1em">
                    {service.credentials && service.credentials.length > 0 && <Tab>Credentials</Tab>}
                    {/* <Tab>Rest</Tab>
          <Tab>SDK</Tab>
          <Tab>GraphQL</Tab> */}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {service.credentials && service.credentials.length > 0 && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <SimpleGrid columns={{base: 1, sm: 2, xl: 3}} spacing={5}>
                                    {service.credentials && service.credentials.map((value, index) => {
                                        const label = value.replace('_', ' ')
                                        return (
                                            <FormControl id={value} key={index} isInvalid={errors[value]}>
                                                <FormLabel ml="5px">{capitalizeFirstLetter(label)}</FormLabel>
                                                {
                                                    value === 'region' ? <Select placeholder="Select option"
                                                                                 isDisabled={isLoading} isRequired={true}>
                                                            {
                                                                credential_fields.AWS.region.value.map((option, index) => {
                                                                        const option_label = option.replace('_', ' ')
                                                                        return <option key={index}
                                                                                       value={option}
                                                                                       className={'py-5'}
                                                                                       {...register(value.replace(" ", "_").toLowerCase(), {
                                                                                           required: "This field is required.",
                                                                                           minLength: {
                                                                                               value: 4,
                                                                                               message: "Minimum length should be 4"
                                                                                           }
                                                                                       })
                                                                                       }
                                                                        >{option_label}</option>
                                                                    }
                                                                )}
                                                        </Select>
                                                        : <Input type="text"
                                                                 isDisabled={isLoading}
                                                                 {...register(value.replace(" ", "_").toLowerCase(), {
                                                                     required: "This field is required.",
                                                                     minLength: {
                                                                         value: 4,
                                                                         message: "Minimum length should be 4"
                                                                     }
                                                                 })
                                                                 } placeholder={`Type here...`}/>}


                                                <FormErrorMessage>
                                                    {errors[value] && errors[value].message}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )
                                    })}
                                </SimpleGrid>
                                <Flex alignContent="center" alignItems="center">
                                    <Button type="submit" mt={10} size="lg" isLoading={isLoading}>Save</Button>
                                    <Spacer/>
                                    {!isLoading && <Button mt={10} size="lg" variant={"ghost"} colorScheme={"red"}
                                             onClick={() => onClose()}>Cancel</Button>}
                                </Flex>

                                <Container mt={25}>
                                    <Text size="xs" align="center"
                                        // color="grey"
                                    >
                                        Your credentials are encrypted in transit, with database
                                        level access control and is never stored as plain text.
                                    </Text>
                                </Container>
                            </form>
                        )}
                    </TabPanel>
                    {/* <TabPanel>
            <p>Rest!</p>
          </TabPanel>
          <TabPanel>
            <p>SDKs!</p>
          </TabPanel>
          <TabPanel>
            <p>GraphQL (Coming soon!)</p>
          </TabPanel> */}
                </TabPanels>
            </Tabs>
        </>
    )
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default ServiceModal

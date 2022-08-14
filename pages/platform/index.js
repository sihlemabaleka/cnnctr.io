import {
    Center, Heading
} from '@chakra-ui/layout'

const PlatformPage = () => {

    return (
        <>
            <Center><Heading fontWeight={"900"}>Loading...</Heading></Center>
        </>
    )
}


export async function getServerSideProps({req, res}) {
    return {
        redirect: {
            permanent: false,
            destination: `/platform/data-sources/aws_dynamodb`
        }
    }
}


export default PlatformPage

import {
    Grid,
    GridItem,
} from '@chakra-ui/layout';
import Header from './Header';
import Sidebar from './Sidebar';
import Page from './Page';
import Footer from './Footer';
import CopyrightText from './CopyrightText';
import {pageTransition} from '../animations/Animations.framer';
import {motion} from 'framer-motion';

const Layout = ({
                    children,
                    title = 'AWS DynamoDB',
                    services,
                    selected_service = 'aws_dynamodb',
                    itemOpened,
                    menuRef,
                    onDrawerOpen,
                    base_path,
                    page,
                    routeTo
                }) => {
    return (
        <Grid
            h="100vh"
            templateRows="repeat(12, 1fr)"
            templateColumns="repeat(5, 1fr)"
        >
            <GridItem
                colSpan={5}
                rowSpan={1}
                // bg="#FDFDFD"
                borderBottom="1px solid #D3D3D3"
            >
                <Header page={page} menuRef={menuRef} onDrawerOpen={onDrawerOpen} routeTo={routeTo}/>
            </GridItem>
            <GridItem colSpan={5} rowSpan={10} 
            // bg="#FDFDFD"
            >
                <Grid
                    h="100%"
                    templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(5, 1fr)"
                >
                    <GridItem
                        rowSpan={10}
                        colSpan={1}
                        // bg="#FDFDFD"
                        borderRight={{base: 'none', md: '1px solid #D3D3D3'}}
                        style={{
                            overflowY: 'auto',
                        }}
                        d={{base: 'none', lg: 'initial'}}
                    >
                        <Sidebar services={services} selected_service={selected_service} base_path={base_path}/>
                    </GridItem>
                    <GridItem
                        rowSpan={10}
                        colSpan={{base: 5, lg: 4}}
                        // bg="#FDFDFD"
                        borderRight={['none', '1px solid #D3D3D3']}
                    >
                        <motion.div
                            variants={pageTransition} // Pass the variant object into Framer Motion
                            initial="hidden" // Set the initial state to variants.hidden
                            animate="enter" // Animated state to variants.enter
                            exit="exit" // Exit state (used later) to variants.exit
                            transition={{type: 'linear'}} // Set the transition to linear
                        >
                            <Page title={title} itemOpened={itemOpened}>
                                {children}
                            </Page>
                        </motion.div>
                    </GridItem>
                </Grid>
            </GridItem>
            <GridItem
                colSpan={5}
                rowSpan={1}
                // bg="#FDFDFD"
                borderTop="1px solid #D3D3D3"
            >
                <Footer/>
                <CopyrightText/>
            </GridItem>
        </Grid>
    );
};

export default Layout;

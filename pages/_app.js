import {ChakraProvider} from '@chakra-ui/react';

import {AnimatePresence} from 'framer-motion'
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

function MyApp({Component, pageProps}) {
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ChakraProvider>
                    <AnimatePresence
                        exitBeforeEnter
                        initial={true}
                        onExitComplete={() => window.scrollTo(0, 0)}
                    >
                        <Component {...pageProps} />
                    </AnimatePresence>
                </ChakraProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;

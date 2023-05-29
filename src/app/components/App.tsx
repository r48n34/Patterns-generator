import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ModalsProvider } from '@mantine/modals';
import { LoadingOverlay, MantineProvider, Tabs } from '@mantine/core';

import MainParts from './parts/MainParts';
import TemplatePage from './parts/TemplatePage';
import FavouritePage from './parts/FavouritePage';

import { getFavList } from '../utils/callFigma';
import { useFavStore } from '../store/favStore';

function App() {

    const setArrayFav = useFavStore((state) => state.setArray);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    
    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, message } = event.data.pluginMessage;

            if (type === 'processing') {
                console.log("Processing");
                setIsLoading(true);
            }

            if (type === 'get-fav-list-done') {
                // console.log("Processing");
                console.log("MES", message);
                setArrayFav(message);
            }

            if (type === 'done') {
                console.log(`Figma Says: ${message}`);
                setIsLoading(false);
                toast.success("Created shapes");
            }

        };

        setTimeout( () => getFavList(), 200)
        
    }, []);

    
    return (
        <>
        <Toaster/>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
        <ModalsProvider>


            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            <Tabs defaultValue="pattens">
                <Tabs.List>
                    <Tabs.Tab value="pattens" >Pattens</Tabs.Tab>
                    <Tabs.Tab value="template">Template</Tabs.Tab>
                    <Tabs.Tab value="favourite">Favourite</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="pattens" pt="xs">
                    <MainParts />
                </Tabs.Panel>

                <Tabs.Panel value="template" pt="xs">
                    <TemplatePage />
                </Tabs.Panel>

                <Tabs.Panel value="favourite" pt="xs">
                    <FavouritePage />
                </Tabs.Panel>
            </Tabs>
        </ModalsProvider>
        </MantineProvider>
        </>
    );
}

export default App;

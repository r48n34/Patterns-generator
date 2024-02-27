import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ModalsProvider } from '@mantine/modals';
import { LoadingOverlay, MantineProvider, Tabs } from '@mantine/core';

import MainParts from './parts/MainParts';
import TemplatePage from './parts/TemplatePage';
import FavouritePage from './parts/FavouritePage';

import { getFavList } from '../utils/callFigma';
import { useFavStore } from '../store/favStore';
import { IconHeart, IconPalette, IconPhoto } from '@tabler/icons-react';

function App() {

    const setArrayFav = useFavStore((state) => state.setArray);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    
    React.useEffect(() => {
        window.onmessage = (event) => {
            try {     
                const { type, message } = event.data.pluginMessage;
    
                if (type === 'processing') {
                    setIsLoading(true);
                }
    
                if (type === 'get-fav-list-done') {
                    setArrayFav(message);
                }
    
                if (type === 'done') {
                    setIsLoading(false);
                    toast.success("Created shapes");
                }
            } 
            catch (error) {
                console.log(error)
                setIsLoading(false);  
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
                    <Tabs.Tab icon={<IconPalette size="0.8rem" />} value="pattens">
                        Pattens
                    </Tabs.Tab>
                    <Tabs.Tab icon={<IconPhoto size="0.8rem" />} value="template">
                        Template
                    </Tabs.Tab>
                    <Tabs.Tab icon={<IconHeart size="0.8rem" />} value="favourite">
                        Favourite
                    </Tabs.Tab>
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

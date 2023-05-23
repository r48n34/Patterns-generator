import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingOverlay, MantineProvider, Tabs } from '@mantine/core';
// import Hello from './parts/Hello';
import MainParts from './parts/MainParts';
import TemplatePage from './parts/TemplatePage';

function App() {

    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    
    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, message } = event.data.pluginMessage;

            if (type === 'processing') {
                console.log("Processing");
                setIsLoading(true);
            }

            if (type === 'done') {
                console.log(`Figma Says: ${message}`);
                setIsLoading(false);
                toast.success("Created shapes");
            }

        };
    }, []);

    
    return (
        <>
        <Toaster/>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <Tabs defaultValue="pattens">
                <Tabs.List>
                    <Tabs.Tab value="pattens" >Pattens</Tabs.Tab>
                    <Tabs.Tab value="template">Template</Tabs.Tab>
                    {/* <Tabs.Tab value="settings">Settings</Tabs.Tab> */}
                </Tabs.List>

                <Tabs.Panel value="pattens" pt="xs">
                    <MainParts />
                </Tabs.Panel>

                <Tabs.Panel value="template" pt="xs">
                    <TemplatePage />
                </Tabs.Panel>

                {/* <Tabs.Panel value="settings" pt="xs">
                    <Hello/>
                </Tabs.Panel> */}
            </Tabs>

        </MantineProvider>
        </>
    );
}

export default App;

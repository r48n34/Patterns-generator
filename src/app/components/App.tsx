import React from 'react';
import { Toaster } from 'react-hot-toast';
import { MantineProvider, Tabs } from '@mantine/core';
// import Hello from './parts/Hello';
import MainParts from './parts/MainParts';
import TemplatePage from './parts/TemplatePage';

function App() {
  return (
    <>
    <Toaster/>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
        {/* <MainParts/> */}

        <Tabs defaultValue="pattens">
            <Tabs.List>
                <Tabs.Tab value="pattens" >Pattens</Tabs.Tab>
                <Tabs.Tab value="template">Template</Tabs.Tab>
                {/* <Tabs.Tab value="settings">Settings</Tabs.Tab> */}
            </Tabs.List>

            <Tabs.Panel value="pattens" pt="xs">
                <MainParts/>
            </Tabs.Panel>

            <Tabs.Panel value="template" pt="xs">
                <TemplatePage/>
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

import React from 'react';
import { MantineProvider, Tabs } from '@mantine/core';
import MainParts from './parts/MainParts';
import { Toaster } from 'react-hot-toast';
import Hello from './parts/Hello';

function App() {
  return (
    <>
    <Toaster/>
    <MantineProvider withGlobalStyles withNormalizeCSS>
        {/* <MainParts/> */}

        <Tabs defaultValue="gallery">
            <Tabs.List>
                <Tabs.Tab value="gallery" >Gallery</Tabs.Tab>
                <Tabs.Tab value="messages">Messages</Tabs.Tab>
                <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery" pt="xs">
                <MainParts/>
            </Tabs.Panel>

            <Tabs.Panel value="messages" pt="xs">
                <Hello/>
            </Tabs.Panel>

            <Tabs.Panel value="settings" pt="xs">
                <Hello/>
            </Tabs.Panel>
        </Tabs>

    </MantineProvider>
    </>
  );
}

export default App;

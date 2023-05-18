import React from 'react';
import { MantineProvider } from '@mantine/core';
import MainParts from './parts/MainParts';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster/>
    <MantineProvider withGlobalStyles withNormalizeCSS>
        <MainParts/>
    </MantineProvider>
    </>
  );
}

export default App;

import React from 'react';
import { MantineProvider } from '@mantine/core';
import MainParts from './parts/MainParts';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
        <MainParts/>
    </MantineProvider>
  );
}

export default App;

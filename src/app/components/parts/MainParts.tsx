import React from 'react';
import { Container } from '@mantine/core';
import GenPatternsForm from '../utilsComp/GenPatternsForm';

function MainParts() {
    return (
        <Container>
            <GenPatternsForm mode='create'/>
        </Container>
    )
}

export default MainParts

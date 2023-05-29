import React from 'react';
import { Card, Text } from '@mantine/core';

function EmptyCard(){
    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" >
            <Text size="lg" ta={"center"}>
                No favourite yet :(
            </Text>

            <Text size="sm" color="dimmed" ta={"center"}>
                Try to add some favourite now!
            </Text>
        </Card>
        </>
    )
}
    
export default EmptyCard

import React from 'react';

import { TemplateListData } from "../../data/templateConfig";
import { Card, Text, Badge, Button, Group } from '@mantine/core';

type TemplateCardProps = {
    data: TemplateListData;
}

function TemplateCard({ data }: TemplateCardProps) {

    function generateTemplate(){
        parent.postMessage({ pluginMessage: { type: 'create-rectangles', data: data.config } }, '*');
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{ data.title }</Text>
                <Badge color="pink" variant="light">
                    {data.config.shapes}
                </Badge>
            </Group>

            <Text size="sm" color="dimmed">
                { data.description }
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={ () => generateTemplate()}>
                Generate this
            </Button>
        </Card>
    )
}

export default TemplateCard

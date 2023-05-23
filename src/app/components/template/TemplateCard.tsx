import React from 'react';

import { TemplateListData } from "../../data/templateConfig";
import { Card, Text, Button, Group } from '@mantine/core';
import { generateTemplate } from '../../utils/callFigma';

import TemplateDateModal from './TemplateDateModal';

type TemplateCardProps = {
    data: TemplateListData;
}

function TemplateCard({ data }: TemplateCardProps) {
    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" withBorder>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{ data.title }</Text>
                <TemplateDateModal data={data}/>
            </Group>

            <Text size="sm" color="dimmed">
                { data.description }
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={ () => generateTemplate(data.config) }>
                Generate this
            </Button>
        </Card>
        </>
    )
}

export default TemplateCard

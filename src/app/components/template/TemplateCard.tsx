import React from 'react';

import { Card, Text, Button, Group, Space } from '@mantine/core';
import { generateTemplate } from '../../utils/callFigma';

// import TemplateDateModal from './TemplateDateModal';
import { PattenConfig } from '../../interface/shapesConfig';
import TemplateMenu from './TemplateMenu';

type TemplateCardProps = {
    data: PattenConfig;
    showsDelete?: boolean
    showsEdit?: boolean
}

function TemplateCard({ data, showsDelete = false , showsEdit = false }: TemplateCardProps) {
    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Space h="lg" />

            <Group position="apart" mb="xs">
                <Text weight={500} fz={18}>{ data.title }</Text>
                <TemplateMenu data={data} showsDelete={showsDelete} showsEdit={showsEdit}/>
            </Group>

            <Text size="sm" color="dimmed">
                { data.description }
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={ () => generateTemplate(data.config) }>
                Generate this
            </Button>

            <Space h="lg" />
        </Card>
        </>
    )
}

export default TemplateCard

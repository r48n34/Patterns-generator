import React from 'react';

import { Card, Text, Button, Group } from '@mantine/core';
import { generateTemplate } from '../../utils/callFigma';

// import TemplateDateModal from './TemplateDateModal';
import { PattenConfig } from '../../interface/shapesConfig';
import TemplateMenu from './TemplateMenu';

type TemplateCardProps = {
    data: PattenConfig;
    showsDelete?: boolean
}

function TemplateCard({ data, showsDelete = false }: TemplateCardProps) {
    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" withBorder>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{ data.title }</Text>
                {/* <TemplateDateModal data={data}/> */}
                <TemplateMenu data={data} showsDelete={showsDelete}/>
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

import React from 'react';

import { Card, Text, Button, Group, Tooltip } from '@mantine/core';
import { generateTemplate } from '../../utils/callFigma';

// import TemplateDateModal from './TemplateDateModal';
import { PattenConfig } from '../../interface/shapesConfig';
import TemplateMenu from './TemplateMenu';
import { IconHammer } from '@tabler/icons-react';
import LabelsDisplayNav from './LabelsDisplayNav';

type TemplateCardProps = {
    data: PattenConfig;
    showsDelete?: boolean
    showsEdit?: boolean
    showsExport?: boolean
}

function TemplateCard({ data, showsDelete = false, showsEdit = false, showsExport = true }: TemplateCardProps) {
    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ overflow: "visible" }}>

                <LabelsDisplayNav data={data} />

                <Group position="apart" mb="xs" mt={6}>
                    <Text weight={500} fz={18}>{data.title}</Text>
                    <TemplateMenu
                        data={data}
                        showsDelete={showsDelete}
                        showsEdit={showsEdit}
                        showsExport={showsExport}
                    />
                </Group>

                <Text size="sm" color="dimmed">
                    {data.description}
                </Text>

                <Tooltip label="Generate Pattern">
                <Button
                    leftIcon={<IconHammer size="1rem" />}
                    variant="light"
                    color="blue"
                    fullWidth mt="md"
                    radius="md"
                    onClick={() => generateTemplate(data.config)}
                >
                    Generate
                </Button>
                </Tooltip>

            </Card>
        </>
    )
}

export default TemplateCard

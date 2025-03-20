import React from 'react';

import { Card, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { generateTemplate } from '../../utils/callFigma';

import { PattenConfig } from '../../interface/shapesConfig';
import TemplateMenu from './TemplateMenu';
import LabelsDisplayNav from './LabelsDisplayNav';
import { IconHammer } from '@tabler/icons-react';

type TemplateCardProps = {
    data: PattenConfig;
    showsDetails?: boolean
    showsDelete?: boolean
    showsEdit?: boolean
    showsExport?: boolean
}

function TemplateCardSmall({ data, showsDelete = false, showsEdit = false, showsDetails = true, showsExport = true }: TemplateCardProps) {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder style={{ overflow: "visible" }}>

            <LabelsDisplayNav data={data} />

            <Text weight={500} fz={14} mt={6}>{data.title}</Text>

            <Group position={showsDetails ? "apart" : "right"} mt={12}>
                {showsDetails && <TemplateMenu data={data} showsDelete={showsDelete} showsEdit={showsEdit} showsExport={showsExport} />}

                <Tooltip label="Generate Pattern">
                    <ActionIcon
                        color="blue"
                        variant="light"
                        onClick={() => generateTemplate(data.config)}
                    >
                        <IconHammer size="1.125rem" />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Card>
    )
}

export default TemplateCardSmall

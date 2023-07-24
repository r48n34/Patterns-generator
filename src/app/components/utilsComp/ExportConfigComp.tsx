import { Modal, Group, Text, ActionIcon, Tooltip, JsonInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import { ShapesGenData } from '../../interface/shapesConfig';
import { IconCopy, IconFileExport } from '@tabler/icons-react';
import { toCopyBoard } from '../../utils/copyItems';

type ExportConfigCompProps = {
    data: ShapesGenData;
}

function ExportConfigComp({ data }: ExportConfigCompProps) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={
                    <>
                        <Group position="left">
                            <Text>Export Data</Text>

                            <Tooltip label={"Copy to Board"}>
                                <ActionIcon onClick={() => toCopyBoard(JSON.stringify(data, null, " "))}>
                                    <IconCopy size="1.125rem" />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </>
                }
            >
                <JsonInput value={JSON.stringify(data, null, " ")} minRows={18}/>
            </Modal>

            <Tooltip label="Export config">
                <ActionIcon size="lg" onClick={open}>
                    <IconFileExport size="1.2rem" />
                </ActionIcon>
            </Tooltip>
        </>
    );
}

export default ExportConfigComp

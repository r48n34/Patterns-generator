import React from 'react';
import { Modal, ActionIcon, JsonInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFileDots } from '@tabler/icons-react';
import { PattenConfig } from '../../interface/shapesConfig';

type TemplateDateModalProps = {
    data: PattenConfig;
}

function TemplateDateModal({ data }: TemplateDateModalProps){
    
    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <>
        <Modal opened={opened} onClose={close} title="Data">
            <JsonInput disabled value={JSON.stringify(data.config, null, " ")} minRows={12}/>
        </Modal>

        <ActionIcon onClick={open}>
            <IconFileDots size="1.125rem" />
        </ActionIcon>
        </>
    )
}
    
export default TemplateDateModal

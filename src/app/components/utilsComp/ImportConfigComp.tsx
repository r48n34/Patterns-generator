import React from 'react';

import { Modal, ActionIcon, Tooltip, JsonInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconFileImport } from '@tabler/icons-react';
import toast from 'react-hot-toast';

const dummyJson = JSON.stringify({
    "rows": 15,
    "cols": 15,
    "paddingRows": 80,
    "paddingCols": 80,
    "density": 80,
    "shapeSize": 25,
    "shapes": "Ellipse",
    "rotation": 0,
    "color": "#FFFFFF",
    "textContent": "",
    "randomMode": true,
    "randomDensity": 0.5,
    "effectsMode": "Glow",
    "effectsConfig": {
        "color": "#FFFFFF",
        "intensity": 1,
        "layers": 5
    }
}, null, " ")

interface ImportConfigCompProps {
    onSubmitData: Function
}

function ImportConfigComp({ onSubmitData }: ImportConfigCompProps) {
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            jsonData: '',
        },
        validate: {
            jsonData: (value) => (!!value ? null : 'Invalid data'),
        },
    });

    return (
        <>
            <Modal opened={opened} onClose={close} title="Import config">
                <form onSubmit={form.onSubmit((values) => {
                    const isSuccess = onSubmitData(values.jsonData);

                    if (isSuccess) {
                        toast.success("Success to import")
                        close();
                    }
                })}>

                    <JsonInput
                        label="Place the JSON data"
                        placeholder={dummyJson}
                        minRows={18}
                        {...form.getInputProps('jsonData')}
                    />

                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Modal>

            <Tooltip label="Import config">
                <ActionIcon size="lg" onClick={open} color="green" variant="light">
                    <IconFileImport size="1.2rem" />
                </ActionIcon>
            </Tooltip>
        </>
    );
}

export default ImportConfigComp

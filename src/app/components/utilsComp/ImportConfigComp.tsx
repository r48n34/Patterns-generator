import React from 'react';

import { Modal, ActionIcon, Tooltip, JsonInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconBookUpload, IconFileImport, IconLoader3 } from '@tabler/icons-react';
import toast from 'react-hot-toast';

// const dummyJson = JSON.stringify({
//     "rows": 5,
//     "cols": 5,
//     "paddingRows": 80,
//     "paddingCols": 80,
//     "shitfRows": 0,
//     "shitfCols": 0, 
//     "density": 80,
//     "shapeSize": 25,
//     "shapes": "Ellipse",
//     "textContent": "",
//     "color": "#FFFFFF",
//     "randomMode": false,
//     "randomDensity": 0.5,
//     "rotation": 0,
//     "effectsMode": "Null",
//     "effectsConfig": {
//         "color": "#FFFFFF",
//         "intensity": 1,
//         "layers": 6
//     },
//     "flatten": false
// }, null, " ")

interface ImportConfigCompProps {
    onSubmitData: Function
}

interface ImportConfigForm {
    jsonData: string,
    generate: boolean,
}

function ImportConfigComp({ onSubmitData }: ImportConfigCompProps) {
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm<ImportConfigForm>({
        initialValues: {
            jsonData: '',
            generate: false,
        },
        validate: {
            jsonData: (value) => (!!value ? null : 'Invalid data'),
        },
    });

    function submitData(values: ImportConfigForm) {
        const isSuccess = onSubmitData(values.jsonData, values.generate);

        if (isSuccess) {
            toast.success("Success to import")
            close();
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="Import config">
                <form onSubmit={form.onSubmit((values) => submitData(values))}>

                    <JsonInput
                        label="Place the JSON data"
                        placeholder={""}
                        minRows={18}
                        {...form.getInputProps('jsonData')}
                    />

                    <Group position="right" mt="md">
                        <Button
                            type="submit"
                            variant="light"
                            leftIcon={<IconLoader3 size="1.1rem" />}
                            color="gray"
                            size="xs"
                            onClick={() => form.setFieldValue('generate', false)}
                        >
                            Submit
                        </Button>

                        <Button
                            type="submit"
                            variant="light"
                            leftIcon={<IconBookUpload size="1.1rem" />}
                            color="green"
                            size="xs"
                            onClick={() => form.setFieldValue('generate', true)}
                        >
                            Submit & Generate
                        </Button>
                    </Group>
                </form>
            </Modal>

            <Tooltip label="Import config">
                <ActionIcon size="lg" onClick={open}>
                    <IconFileImport size="1.2rem" />
                </ActionIcon>
            </Tooltip>
        </>
    );
}

export default ImportConfigComp

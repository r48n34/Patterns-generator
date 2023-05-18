import React from 'react';

import { NumberInput, Button, Text, Container, Grid, Select, Group, Card, Accordion } from '@mantine/core';
import { useForm } from '@mantine/form';
import toast from 'react-hot-toast';

import { 
    IconArrowAutofitWidth,
    IconArrowAutofitRight,
    IconArrowAutofitUp,
    IconArrowAutofitHeight,
    IconArrowAutofitContent,
    IconZoomPan
} from '@tabler/icons-react';

export interface ShapesGenData {
    rows: number,
    cols: number,
    paddingRows: number,
    paddingCols: number,
    density: number,
    shapeSize: number,
    shapes: "Ellipse" | "Rectangle" | "Polygon" | "Star" ,
}

function MainParts() {

    const form = useForm<ShapesGenData>({
        initialValues: {
          rows: 5,
          cols: 5,
          paddingRows: 80,
          paddingCols: 80,
          density: 80,
          shapeSize: 25,
          shapes: "Ellipse",
        },

        validate: {
            density:     (value) => (value && value >= 1 ? null : 'Invalid density'),
            paddingRows: (value) => (value && value >= 1 ? null : 'Invalid paddingRows'),
            paddingCols: (value) => (value && value >= 1 ? null : 'Invalid paddingCols'),
        },
    });

    function createShapes(values: ShapesGenData){
        console.log(values);
        
        parent.postMessage({ pluginMessage: { type: 'create-rectangles', data: values } }, '*');
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, message } = event.data.pluginMessage;

            console.log(message);

            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
                toast.success("Created shapes");
            }
        };
    }, []);

    React.useEffect(() => {
        form.setFieldValue('paddingCols', form.values.density);
        form.setFieldValue('paddingRows', form.values.density);
    }, [form.values.density]);
    

    return (
        <Container>
        <form onSubmit={form.onSubmit((values) => createShapes(values))}>
            <Text>Rectangle Creator</Text>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
                
            </Card>

            <Accordion multiple={true} defaultValue={["basic"]} mt={6} >

            <Accordion.Item value="basic">
                <Accordion.Control>
                    Basic
                </Accordion.Control>

                <Accordion.Panel>
                <Select
                    label="Shapes"
                    placeholder="Pick one"
                    data={[
                        { value: 'Ellipse', label: '🔴 Ellipse' },
                        { value: 'Rectangle', label: '🟥 Rectangle' },
                        { value: 'Polygon', label: '🔻 Polygon' },
                        { value: 'Star', label: '⭐ Star' },
                    ]}
                    {...form.getInputProps('shapes')}
                />

                <Grid mt={4}>
                    <Grid.Col span={6}>
                        <NumberInput
                            icon={<IconArrowAutofitWidth size="1rem" />}
                            placeholder="5"
                            label="Rows Object"
                            withAsterisk
                            min={1}
                            step={1}
                            {...form.getInputProps('rows')}
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <NumberInput
                            icon={<IconArrowAutofitHeight size="1rem" />}
                            placeholder="5"
                            label="Cols Object"
                            withAsterisk
                            min={1}
                            step={1}
                            {...form.getInputProps('cols')}
                        />
                    </Grid.Col>
                </Grid>

                <Grid mt={4}>
                    <Grid.Col span={6}>
                        <NumberInput
                            icon={<IconArrowAutofitContent size="1rem" />}
                            placeholder="100"
                            label="Density"
                            withAsterisk
                            min={1}
                            {...form.getInputProps('density')}
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <NumberInput
                            icon={<IconZoomPan size="1rem" />}
                            placeholder="40"
                            label="Shape Size"
                            withAsterisk
                            min={1}
                            precision={1}
                            {...form.getInputProps('shapeSize')}
                        />
                    </Grid.Col>
                </Grid>
                </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="advanceSetting">
                    <Accordion.Control>
                        Advance
                    </Accordion.Control>

                    <Accordion.Panel>
                    <Grid>
                        <Grid.Col span={6}>
                            <NumberInput
                                icon={<IconArrowAutofitRight size="1rem" />}
                                placeholder="110"
                                label="Rows Padding"
                                withAsterisk
                                min={1}
                                {...form.getInputProps('paddingRows')}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <NumberInput
                                icon={<IconArrowAutofitUp size="1rem" />}
                                placeholder="110"
                                label="Cols Padding"
                                withAsterisk
                                min={1}
                                {...form.getInputProps('paddingCols')}
                            />
                        </Grid.Col>
                    </Grid>
                    </Accordion.Panel>

                </Accordion.Item>

            </Accordion>

            <Group position='right' mt={6}>
                <Button type="submit">
                    Create
                </Button>
            </Group>

        </form>
        </Container>
    )
}

export default MainParts

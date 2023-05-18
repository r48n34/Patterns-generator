import React from 'react';

import { NumberInput, Button, Text, Container, Grid, Select, Group, Card } from '@mantine/core';
import { useForm } from '@mantine/form';

// import toast from 'react-hot-toast';

export interface ShapesGenData {
    rows: number,
    cols: number,
    density: number,
    shapeSize: number,
    shapes: "Ellipse" | "Rectangle" | "Polygon" ,
}

function MainParts() {

    const form = useForm<ShapesGenData>({
        initialValues: {
          rows: 5,
          cols: 5,
          density: 110,
          shapeSize: 30,
          shapes: "Ellipse",
        },
    });

    function createShapes(values: ShapesGenData){
        console.log(values);
        
        parent.postMessage({ pluginMessage: { type: 'create-rectangles', data: values } }, '*');
    };

    // const createImg = () => {
    //     parent.postMessage({ pluginMessage: { type: 'create-img' } }, '*');
    // };


    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, message } = event.data.pluginMessage;

            console.log(message);

            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <Container>
        <form onSubmit={form.onSubmit((values) => createShapes(values))}>
            <Text>Rectangle Creator</Text>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
                
            </Card>



            <Select
                label="Shapes"
                placeholder="Pick one"
                data={[
                    { value: 'Ellipse', label: 'Ellipse' },
                    { value: 'Rectangle', label: 'Rectangle' },
                    { value: 'Polygon', label: 'Polygon' },
                ]}
                {...form.getInputProps('shapes')}
            />

            <Grid>
                <Grid.Col span={6}>
                    <NumberInput
                        placeholder="5"
                        label="Rows"
                        withAsterisk
                        min={1}
                        {...form.getInputProps('rows')}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <NumberInput
                        placeholder="5"
                        label="Cols"
                        withAsterisk
                        min={1}
                        {...form.getInputProps('cols')}
                    />
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={6}>
                    <NumberInput
                        placeholder="100"
                        label="Density"
                        withAsterisk
                        min={1}
                        {...form.getInputProps('density')}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <NumberInput
                        placeholder="40"
                        label="Shape Size"
                        withAsterisk
                        min={1}
                        {...form.getInputProps('shapeSize')}
                    />
                </Grid.Col>
            </Grid>

            <Group position='right' mt={6}>
                <Button type="submit">
                    Create
                </Button>
            </Group>

            {/* <Button id="createImg" onClick={() => createImg()}>
                Create img
            </Button> */}

            {/* <Button onClick={onCancel}>Cancel</Button> */}
        </form>
        </Container>
    )
}

export default MainParts

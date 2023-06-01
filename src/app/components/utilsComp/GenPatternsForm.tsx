import React from 'react';
import { NumberInput, Button, Container, Grid, Select, Group, Accordion, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { 
    IconArrowAutofitWidth,
    IconArrowAutofitRight,
    IconArrowAutofitUp,
    IconArrowAutofitHeight,
    IconArrowAutofitContent,
    IconZoomPan,
    IconBook2, 
    IconPencilPlus,
} from '@tabler/icons-react';

import { ShapesGenData } from '../../interface/shapesConfig';
import { editFavListOneItem, generateTemplate } from '../../utils/callFigma';
import AddFavouriteModal from '../utilsComp/AddFavouriteModal';
import { useFavStore } from '../../store/favStore';
import { toast } from 'react-hot-toast';

type Mode = "create" | "edit"
type GenPatternsFormProps = {
    mode: Mode;
    data?: ShapesGenData
    title?: string
    closeFunc?: Function
}

function initData(mode: Mode, data?: ShapesGenData){
    if(mode === "edit" && !!data){
        return data
    }

    return {
        rows: 5,
        cols: 5,
        paddingRows: 80,
        paddingCols: 80,
        density: 80,
        shapeSize: 25,
        shapes: "Ellipse",
        textContent: "",
    } as ShapesGenData
}

function GenPatternsForm({ 
    mode = "create",
    data,
    title = "",
    closeFunc
}:GenPatternsFormProps) {

    const editItemFav = useFavStore((state) => state.editItem);

    const form = useForm<ShapesGenData>({
        initialValues: initData(mode, data),
        validate: {
            density:     (value) => (value && value >= 1 ? null : 'Invalid density'),
            rows:        (value) => (value && value >= 1 ? null : 'Invalid rows'),
            cols:        (value) => (value && value >= 1 ? null : 'Invalid cols'),
            shapeSize:   (value) => (value && value >= 1 ? null : 'Invalid shapeSize'),
            paddingRows: (value) => (value && value >= 1 ? null : 'Invalid paddingRows'),
            paddingCols: (value) => (value && value >= 1 ? null : 'Invalid paddingCols'),
        },
    });

    function createShapes(values: ShapesGenData){

        console.log(values);

        if(mode === "edit"){
            editItemFav(title, values);
            editFavListOneItem({title: title, newData: values});
            toast.success("Edited")
        }
        else{
            generateTemplate(values);
        }
        
        !!closeFunc && closeFunc()
    };

    React.useEffect(() => {
        form.setFieldValue('paddingCols', form.values.density);
        form.setFieldValue('paddingRows', form.values.density);
    }, [form.values.density]);
    
    return (
        <Container>
        
        { mode === "create" && (
            <Group position="right">
                <AddFavouriteModal data={form.values}/>
            </Group>
        )}

        <form onSubmit={form.onSubmit((values) => createShapes(values))}>
            <Accordion multiple={true} defaultValue={["basic"]} mt={6} >

            <Accordion.Item value="basic">
                <Accordion.Control icon={ <IconBook2 size={25}/> }>
                    Basic
                </Accordion.Control>

                <Accordion.Panel>
                <Select
                    label="Shapes"
                    placeholder="Pick one"
                    data={[
                        { value: 'Rectangle', label: '🟥 Rectangle' },
                        { value: 'Ellipse', label: '🔴 Ellipse' },
                        { value: 'Polygon', label: '🔻 Polygon' },
                        { value: 'Star', label: '⭐ Star' },
                        { value: 'Text', label: '🖊 Text' },
                    ]}
                    {...form.getInputProps('shapes')}
                />

                
                { form.values.shapes === "Text" && (
                    <TextInput
                        mt={10}
                        placeholder="K"
                        label="Text content"
                        withAsterisk
                        {...form.getInputProps('textContent')}
                    />
                )}  

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
                    <Accordion.Control icon={<IconPencilPlus size={25}/>}>
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
                <Button type="submit" variant="light" mt={6}>
                    { mode === "create" ? "Create" : "Edit" }
                </Button>
            </Group>

        </form>
        </Container>
    )
}

export default GenPatternsForm

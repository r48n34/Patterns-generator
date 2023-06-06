import React from 'react';
import { NumberInput, Button, Grid, Select, Accordion, TextInput, Switch, Text, ColorInput, ActionIcon, Group, Tooltip } from '@mantine/core';
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
    IconBrandDenodo,
    IconRotate,
    IconRefresh,
    Icon3dRotate,
    IconGridDots,
    IconZoomReset
} from '@tabler/icons-react';

import { ShapesGenData } from '../../interface/shapesConfig';
import { editFavListOneItem, generateTemplate } from '../../utils/callFigma';
import AddFavouriteModal from '../utilsComp/AddFavouriteModal';
import { useFavStore } from '../../store/favStore';
import { toast } from 'react-hot-toast';

type Mode = "create" | "edit" | "view"
type GenPatternsFormProps = {
    mode: Mode;
    data?: ShapesGenData
    title?: string
    closeFunc?: Function
}

function initData(mode: Mode, data?: ShapesGenData){
    if( (mode === "edit" || mode === "view") && !!data){
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
        color: "#FFFFFF",
        randomMode: false,
        randomDensity: 0.5,
        rotation: 0,
        effectsMode: "Null",
        effectsConfig: {
            color: "#FFFFFF",
            intensity: 1,
            layers: 6
        },
    } as ShapesGenData
}

function GenPatternsForm({ 
    mode = "create",
    data,
    title = "",
    closeFunc
}: GenPatternsFormProps) {

    const editItemFav = useFavStore((state) => state.editItem);

    const patternsForm = useForm<ShapesGenData>({
        initialValues: initData(mode, data),
        validate: {
            density:       (value) => (value && value >= 1 ? null : 'Invalid density'),
            rows:          (value) => (value && value >= 1 ? null : 'Invalid rows'),
            cols:          (value) => (value && value >= 1 ? null : 'Invalid cols'),
            shapeSize:     (value) => (value && value >= 1 ? null : 'Invalid shapeSize'),
            paddingRows:   (value) => (value && value >= 1 ? null : 'Invalid paddingRows'),
            paddingCols:   (value) => (value && value >= 1 ? null : 'Invalid paddingCols'),
            // color:         (value) => (!!value ? null : 'Invalid color'),
            // rotation:      (value) => (Number.isInteger(value) && (value >= -180 && value <= 180) ? null : 'Invalid rotation'),
            randomDensity: (value) => checkRandomDensity(value),
            // effectsMode:   (value) => (value ? null : 'Invalid effectsMode'),
            effectsConfig: {
                color:     (value) => checkEffectsConfig(value, "color"),
                intensity: (value) => checkEffectsConfig(value, "intensity"),
                layers:    (value) => checkEffectsConfig(value, "layers"),
            }
        },
    });

    function checkEffectsConfig(value: string | number, title: string){
        if(patternsForm.values.effectsMode === "Null"){
            return null
        }

        return value ? null : `Invalid ${title}`
    }

    function checkRandomDensity(value: number){
        if(!patternsForm.values.randomMode){
            return null
        }

        return value && (value >= 0.1 || value <= 0.9) ? null : 'Invalid Random Density'
    }

    function createShapes(values: ShapesGenData){

        !values.color         && (values.color = "#FFFFFF")
        !values.rotation      && (values.rotation = 0)
        !values.randomDensity && (values.randomDensity = 1)
        !values.effectsMode   && (values.effectsMode = "Null")
        !values.effectsConfig && (values.effectsConfig = {
            color: "#FFFFFF",
            intensity: 1,
            layers: 5
        })

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
        patternsForm.setFieldValue('paddingCols', patternsForm.values.density);
        patternsForm.setFieldValue('paddingRows', patternsForm.values.density);
    }, [patternsForm.values.density]);
    
    return (
        <>

        <Group position="right" mt={2} mb={8}>
            <AddFavouriteModal data={patternsForm.values}/>
        </Group>
        
        <form onSubmit={patternsForm.onSubmit((values) => createShapes(values))}>

        { mode !== "view" &&  (
                <Grid mb={6}>

                    <Grid.Col span={4}>
                        <Button
                            leftIcon={<IconZoomReset size={"1rem"} />}
                            color="gray" fullWidth
                            variant="light"
                            onClick={ () => {
                                toast.success("Form reset");
                                patternsForm.reset();
                            }}
                        >
                            Reset
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={8}>
                        <Button
                            leftIcon={<IconGridDots size={"1rem"} />}
                            fullWidth type="submit" 
                            variant="light" 
                        >
                            { mode === "create" ? "Create" : "Edit" }
                        </Button>
                    </Grid.Col>

                </Grid>
            )}

            <Accordion multiple={true} defaultValue={["basic"]} mt={6} >

                <Accordion.Item value="basic">
                <Accordion.Control icon={ <IconBook2 size={25}/> }>
                    Basic
                </Accordion.Control>

                <Accordion.Panel>
                <Select
                    label="Shapes"
                    placeholder="Pick one"
                    searchable
                    disabled={ mode === "view" }
                    nothingFound="No options"
                    transitionProps={{ transition: 'fade', duration: 70, timingFunction: 'ease' }}
                    data={[
                        { value: 'Rectangle', label: '🟥 Rectangle', group: 'Rectangle' },
                        { value: 'Ellipse', label: '🔴 Ellipse', group: 'Ellipse' },
                        { value: 'Ellipse-half', label: '🌗 Half Ellipse', group: 'Ellipse' },
                        { value: 'Ellipse-one-four', label: '🕘 1/4 Ellipse', group: 'Ellipse' },
                        { value: 'Polygon', label: '🔻 Polygon', group: 'Polygon' },
                        { value: 'Star', label: '⭐ Star', group: 'Star' },
                        { value: 'Star-4', label: '✨ Star 4', group: 'Star' },
                        { value: 'Line', label: '➖ Line', group: 'Polygon' },
                        { value: 'Text', label: '🖊 Text', group: 'Text' },
                    ]}
                    {...patternsForm.getInputProps('shapes')}
                />

                
                { patternsForm.values.shapes === "Text" && (
                    <TextInput
                        mt={10}
                        placeholder="K"
                        disabled={ mode === "view" }
                        label="Text content"
                        withAsterisk
                        {...patternsForm.getInputProps('textContent')}
                    />
                )}  

                <Grid mt={4}>
                    <Grid.Col span={6}>
                        <NumberInput
                            icon={<IconArrowAutofitWidth size="1rem" />}
                            placeholder="5"
                            label="Rows Object"
                            disabled={ mode === "view" }
                            withAsterisk
                            min={1}
                            step={1}
                            {...patternsForm.getInputProps('rows')}
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <NumberInput
                            icon={<IconArrowAutofitHeight size="1rem" />}
                            placeholder="5"
                            disabled={ mode === "view" }
                            label="Cols Object"
                            withAsterisk
                            min={1}
                            step={1}
                            {...patternsForm.getInputProps('cols')}
                        />
                    </Grid.Col>
                </Grid>

                <Grid mt={4}>
                    <Grid.Col span={6}>
                        <NumberInput
                            icon={<IconArrowAutofitContent size="1rem" />}
                            placeholder="100"
                            disabled={ mode === "view" }
                            label="Density"
                            withAsterisk
                            min={1}
                            {...patternsForm.getInputProps('density')}
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <NumberInput
                            icon={<IconZoomPan size="1rem" />}
                            disabled={ mode === "view" }
                            placeholder="40"
                            label="Size"
                            withAsterisk
                            min={1}
                            precision={1}
                            {...patternsForm.getInputProps('shapeSize')}
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
                                disabled={ mode === "view" }
                                label="Rows Padding"
                                withAsterisk
                                min={1}
                                {...patternsForm.getInputProps('paddingRows')}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <NumberInput
                                icon={<IconArrowAutofitUp size="1rem" />}
                                placeholder="110"
                                disabled={ mode === "view" }
                                label="Cols Padding"
                                withAsterisk
                                min={1}
                                {...patternsForm.getInputProps('paddingCols')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid mt={6}>
                        <Grid.Col span={6}>
                            <NumberInput
                                icon={<IconRotate size="1rem" />}
                                placeholder="0"
                                description="(-180 to 180)"
                                disabled={ mode === "view" }
                                label="Rotation"
                                withAsterisk
                                min={-180}
                                max={180}
                                {...patternsForm.getInputProps('rotation')}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <ColorInput
                                withEyeDropper
                                disabled={ mode === "view" }
                                placeholder="color"
                                label="Color"
                                description="In Hex"
                                rightSection={
                                    <Tooltip label="Random Color">
                                    <ActionIcon onClick={() => patternsForm.setFieldValue("color", `#${Math.floor(Math.random() * 16777215).toString(16)}`)}>
                                      <IconRefresh size="1rem" />
                                    </ActionIcon>
                                    </Tooltip>
                                }
                                {...patternsForm.getInputProps('color')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid mt={8}>
                        <Grid.Col span={6}>
                            <Switch
                                disabled={ mode === "view" }
                                label="Random"
                                {...patternsForm.getInputProps('randomMode', { type: 'checkbox' })}
                            />

                        </Grid.Col>
                        <Grid.Col span={6}>
                            { patternsForm.values.randomMode && (
                                <>
                                <NumberInput
                                    disabled={ mode === "view" }
                                    icon={<IconBrandDenodo size="1rem" />}
                                    placeholder="0.5"
                                    description="(0.1 - 1)"
                                    label="Random Density"
                                    withAsterisk
                                    precision={1}
                                    step={0.1}
                                    min={0.1}
                                    max={1}
                                    {...patternsForm.getInputProps('randomDensity')}
                                />
                                {/* <Text c="dimmed" fz={12} mt={1}> *Range: 0.1 - 1</Text> */}
                                <Text c="dimmed" fz={12} mt={1}> Higher = more </Text>
                                </>
                            )}
                        </Grid.Col>

                    </Grid>

                    </Accordion.Panel>
                    

                </Accordion.Item>

                <Accordion.Item value="Special Mode">
                    <Accordion.Control icon={<Icon3dRotate size={25}/>}>
                        Special Mode
                    </Accordion.Control>

                    <Accordion.Panel>

                    <Select
                        disabled={ mode === "view" }
                        label="Effects Mode"
                        placeholder="Pick one"
                        transitionProps={{ transition: 'fade', duration: 70, timingFunction: 'ease' }}
                        data={[
                            { value: 'Null', label: 'Null' },
                            { value: 'Glow', label: '💡 Glow'},
                            { value: 'TBD',  label: '🚀 Coming Soon', disabled: true },
                        ]}
                        {...patternsForm.getInputProps('effectsMode')}
                    />

                    { patternsForm.values.effectsMode === "Glow" && (
                        <>
                        <Grid mt={8}>
                            <Grid.Col span={6}>
                                <NumberInput
                                    icon={<IconArrowAutofitRight size="1rem" />}
                                    disabled
                                    placeholder="1"
                                    description="Disabled"
                                    label="Intensity"
                                    withAsterisk
                                    max={1}
                                    min={1}
                                    {...patternsForm.getInputProps('effectsConfig.intensity')}
                                />
                            </Grid.Col>

                            <Grid.Col span={6}>
                                <NumberInput
                                    icon={<IconArrowAutofitUp size="1rem" />}
                                    placeholder="6"
                                    label="Layers"
                                    description="From 1 to 6"
                                    withAsterisk
                                    min={1}
                                    max={6}
                                    step={1}
                                    {...patternsForm.getInputProps('effectsConfig.layers')}
                                />
                            </Grid.Col>
                        </Grid>

                        <Grid>
                            <Grid.Col span={6}>
                                <ColorInput
                                    disabled={ mode === "view" }
                                    withEyeDropper
                                    placeholder="color"
                                    label="Color"
                                    rightSection={
                                        <Tooltip label="Random Color">
                                            <ActionIcon onClick={() => patternsForm.setFieldValue("effectsConfig.color", `#${Math.floor(Math.random() * 16777215).toString(16)}`)}>
                                            <IconRefresh size="1rem" />
                                            </ActionIcon>
                                        </Tooltip>
                                    }
                                    {...patternsForm.getInputProps('effectsConfig.color')}
                                />
                            </Grid.Col>
                        </Grid>
                        </>
                    )}


                    </Accordion.Panel>
                </Accordion.Item>

            </Accordion>

        </form>
        </>
    )
}

export default GenPatternsForm

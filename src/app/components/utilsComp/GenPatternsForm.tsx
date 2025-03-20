import React from 'react';
import { NumberInput, Button, Grid, Select, Accordion, TextInput, Switch, Text, ColorInput, ActionIcon, Group, Tooltip, Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

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
import ImportConfigComp from './ImportConfigComp';
import ExportConfigComp from './ExportConfigComp';
import { genPatternsSchema } from '../../utils/validateUtils';

type Mode = "create" | "edit" | "view"
type GenPatternsFormProps = {
    mode: Mode;
    data?: ShapesGenData
    title?: string
    closeFunc?: Function
}

function initData(mode: Mode, data?: ShapesGenData) {
    if ((mode === "edit" || mode === "view") && !!data) {
        return data
    }

    return {
        rows: 5,
        cols: 5,
        paddingRows: 80,
        paddingCols: 80,
        shitfRows: 0,
        shitfCols: 0,
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
        flatten: false
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
        validate: zodResolver(genPatternsSchema),
    });

    function importNewConfig(value: string, directGenerate: boolean = false) {

        try {
            const data: ShapesGenData = JSON.parse(value);

            // Zod validation
            genPatternsSchema.parse(data);
            patternsForm.setValues(data);

            if (directGenerate) {
                createShapes(data);
            }

            return true
        }
        catch (error) {
            toast.error("Invalid import data, please check the source is correct.", { duration: 3000 })
            console.log(error.message);
            return false
        }

    }

    function createShapes(values: ShapesGenData) {

        // For version compatible
        !values.hasOwnProperty("color") && (values.color = "#FFFFFF")
        !values.hasOwnProperty("rotation") && (values.rotation = 0)
        !values.hasOwnProperty("randomDensity") && (values.randomDensity = 1)
        !values.hasOwnProperty("effectsMode") && (values.effectsMode = "Null")
        !values.hasOwnProperty("effectsConfig") && (values.effectsConfig = {
            color: "#FFFFFF",
            intensity: 1,
            layers: 5
        })
        !values.hasOwnProperty("flatten") && (values.flatten = false)

        // 27/02/2024 Added
        !values.hasOwnProperty("shitfRows") && (values.shitfRows = 0)
        !values.hasOwnProperty("shitfCols") && (values.shitfCols = 0)

        if (mode === "edit") {
            editItemFav(title, values);
            editFavListOneItem({ title: title, newData: values });
            toast.success("Edited")
        }
        else {
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

            {mode === "create" && (
                <Group position="apart" mt={2} mb={8}>

                    <Group position="left">
                        <ExportConfigComp data={patternsForm.values} />
                        <ImportConfigComp onSubmitData={importNewConfig} />
                    </Group>

                    <AddFavouriteModal data={patternsForm.values} />
                </Group>
            )}

            <form onSubmit={patternsForm.onSubmit((values) => createShapes(values))}>

                {mode !== "view" && (
                    <Grid mb={6} grow mt={4}>

                        {mode === "create" && (
                            <Grid.Col span={4}>
                                <Button
                                    leftIcon={<IconZoomReset size={"1rem"} />}
                                    color="gray" fullWidth
                                    variant="light"
                                    onClick={() => {
                                        toast.success("Form reset");
                                        patternsForm.reset();
                                    }}
                                >
                                    Reset
                                </Button>
                            </Grid.Col>
                        )}

                        <Grid.Col span={8}>
                            <Button
                                leftIcon={<IconGridDots size={"1rem"} />}
                                fullWidth type="submit"
                                variant="light"
                            >
                                {mode === "create" ? "Create" : "Edit"}
                            </Button>
                        </Grid.Col>

                    </Grid>
                )}

                <Accordion multiple={true} defaultValue={["basic"]} mt={6} >

                    <Accordion.Item value="basic">
                        <Accordion.Control icon={<IconBook2 size={25} />}>
                            Basic
                        </Accordion.Control>

                        <Accordion.Panel>
                            <Select
                                label="Shapes"
                                placeholder="Pick one"
                                searchable
                                disabled={mode === "view"}
                                nothingFound="No options"
                                transitionProps={{ transition: 'fade', duration: 70, timingFunction: 'ease' }}
                                data={[
                                    { value: 'Rectangle', label: '🟥 Rectangle', group: 'Rectangle' },
                                    { value: 'Ellipse', label: '🔴 Ellipse', group: 'Ellipse / Circle' },
                                    { value: 'Ellipse-half', label: '🌗 Half Ellipse', group: 'Ellipse / Circle' },
                                    { value: 'Ellipse-one-four', label: '🕘 1/4 Ellipse', group: 'Ellipse / Circle' },
                                    { value: 'Polygon', label: '🔻 Polygon', group: 'Polygon' },
                                    { value: 'Star', label: '⭐ Star', group: 'Star' },
                                    { value: 'Star-4', label: '✨ Star 4 (4 Point Star)', group: 'Star' },
                                    { value: 'Star-8', label: '🌟 Star 8 (8 Point Star)', group: 'Star' },
                                    { value: 'Line', label: '➖ Line', group: 'Polygon' },
                                    { value: 'Text', label: '🖊 Text', group: 'Text' },
                                ]}
                                {...patternsForm.getInputProps('shapes')}
                            />

                            {patternsForm.values.shapes === "Text" && (
                                <TextInput
                                    mt={10}
                                    placeholder="K"
                                    disabled={mode === "view"}
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
                                        label="Rows Object Num"
                                        description="Rows object total"
                                        disabled={mode === "view"}
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
                                        disabled={mode === "view"}
                                        label="Cols Object Num"
                                        description="Cols object total"
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
                                        disabled={mode === "view"}
                                        label="Density"
                                        description="Padding of both x and y"
                                        withAsterisk
                                        min={1}
                                        {...patternsForm.getInputProps('density')}
                                    />
                                </Grid.Col>

                                <Grid.Col span={6}>
                                    <Tooltip label="Dimensions for W & H">
                                        <Box>
                                            <NumberInput
                                                icon={<IconZoomPan size="1rem" />}
                                                disabled={mode === "view"}
                                                placeholder="40"
                                                label="Size"
                                                description="Object Size"
                                                withAsterisk
                                                min={1}
                                                precision={1}
                                                {...patternsForm.getInputProps('shapeSize')}
                                            />
                                        </Box>
                                    </Tooltip>
                                </Grid.Col>
                            </Grid>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="advanceSetting">
                        <Accordion.Control icon={<IconPencilPlus size={25} />}>
                            Advance
                        </Accordion.Control>

                        <Accordion.Panel>
                            <Grid>
                                <Grid.Col span={6}>
                                    <NumberInput
                                        icon={<IconArrowAutofitRight size="1rem" />}
                                        placeholder="110"
                                        disabled={mode === "view"}
                                        label="Rows Padding"
                                        description="Sapcing for each row"
                                        withAsterisk
                                        min={1}
                                        {...patternsForm.getInputProps('paddingRows')}
                                    />
                                </Grid.Col>

                                <Grid.Col span={6}>
                                    <NumberInput
                                        icon={<IconArrowAutofitUp size="1rem" />}
                                        placeholder="110"
                                        disabled={mode === "view"}
                                        label="Cols Padding"
                                        description="Sapcing for each col"
                                        withAsterisk
                                        min={1}
                                        {...patternsForm.getInputProps('paddingCols')}
                                    />
                                </Grid.Col>
                            </Grid>

                            {/* Added shitfRows, shitfCols 27/02/2024 */}
                            <Grid>
                                <Grid.Col span={6}>
                                    <NumberInput
                                        icon={<IconArrowAutofitRight size="1rem" />}
                                        placeholder="110"
                                        disabled={mode === "view"}
                                        label="Rows Shitfing"
                                        description="Even rows starting spacing"
                                        withAsterisk
                                        // min={0}
                                        {...patternsForm.getInputProps('shitfRows')}
                                    />
                                </Grid.Col>

                                <Grid.Col span={6}>
                                    <NumberInput
                                        icon={<IconArrowAutofitUp size="1rem" />}
                                        placeholder="110"
                                        disabled={mode === "view"}
                                        label="Cols Shitfing"
                                        description="Even cols starting spacing"
                                        withAsterisk
                                        // min={0}
                                        {...patternsForm.getInputProps('shitfCols')}
                                    />
                                </Grid.Col>
                            </Grid>

                            <Grid mt={6}>
                                <Grid.Col span={6}>
                                    <NumberInput
                                        icon={<IconRotate size="1rem" />}
                                        placeholder="0"
                                        description="(-180 to 180)"
                                        disabled={mode === "view"}
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
                                        disabled={mode === "view"}
                                        placeholder="color"
                                        label="Color"
                                        description="In Hex Color"
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
                                    <Tooltip label="Random Cols and Rows display">
                                        <Box>
                                            <Switch
                                                disabled={mode === "view"}
                                                label="Random Mode"
                                                {...patternsForm.getInputProps('randomMode', { type: 'checkbox' })}
                                            />
                                        </Box>
                                    </Tooltip>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    {patternsForm.values.randomMode && (
                                        <>
                                            <NumberInput
                                                disabled={mode === "view"}
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

                            <Grid mt={8}>
                                <Grid.Col span={6}>
                                    <Tooltip label="Generated graph will be in single layer (Faster)">
                                        <Box>
                                            <Switch
                                                disabled={mode === "view"}
                                                label="Flatten Layer"
                                                {...patternsForm.getInputProps('flatten', { type: 'checkbox' })}
                                            />
                                        </Box>
                                    </Tooltip>
                                </Grid.Col>
                            </Grid>

                        </Accordion.Panel>

                    </Accordion.Item>

                    <Accordion.Item value="Special Mode">
                        <Accordion.Control icon={<Icon3dRotate size={25} />}>
                            Special Mode
                        </Accordion.Control>

                        <Accordion.Panel>

                            <Select
                                disabled={mode === "view"}
                                label="Effects Mode"
                                placeholder="Pick one"
                                transitionProps={{ transition: 'fade', duration: 70, timingFunction: 'ease' }}
                                data={[
                                    { value: 'Null', label: 'Null' },
                                    { value: 'Glow', label: '💡 Glow' },
                                    // { value: 'TBD', label: '🚀 Coming Soon', disabled: true },
                                ]}
                                {...patternsForm.getInputProps('effectsMode')}
                            />

                            {patternsForm.values.effectsMode === "Glow" && (
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
                                                disabled={mode === "view"}
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
                                                disabled={mode === "view"}
                                                withEyeDropper
                                                placeholder="color"
                                                label="Color"
                                                rightSection={
                                                    <Tooltip label="Random Color">
                                                        <ActionIcon
                                                            onClick={() => patternsForm.setFieldValue("effectsConfig.color", `#${Math.floor(Math.random() * 16777215).toString(16)}`)}
                                                        >
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

import React from "react";
import { Tooltip, Code, Space } from "@mantine/core";
import { PattenConfig, shapesIconMap } from "../../interface/shapesConfig";

type LabelsDisplayNavProps = {
    data: PattenConfig;
}

function LabelsDisplayNav({ data }: LabelsDisplayNavProps){
    return (
        <>
            <Code color="blue">
            {shapesIconMap[data.config.shapes]} {data.config.rows} x {data.config.cols}
            </Code>

            <Space h="xs" />

            { data.config.randomMode && (
                <Tooltip label={"Random patterns (" + data.config.randomDensity + ")"}>
                    <Code color="blue" mr={4}>🎲</Code>
                </Tooltip>
            )}

            { data.config.effectsMode === "Glow" && (
                <Tooltip label={"Glow"}>
                    <Code color="blue" mr={4}>💡</Code>
                </Tooltip>
            )}
        </>
    )
}
    
export default LabelsDisplayNav

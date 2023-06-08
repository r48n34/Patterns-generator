import React from "react";
import { Tooltip, Code } from "@mantine/core";
import { PattenConfig, shapesIconMap } from "../../interface/shapesConfig";

type LabelsDisplayNavProps = {
    data: PattenConfig;
}

function LabelsDisplayNav({ data }: LabelsDisplayNavProps){
    return (
        <>
            <Code color="blue" style={{ fontSize: "10px"}}>
                {shapesIconMap[data.config.shapes]} {data.config.rows} x {data.config.cols}
            </Code>

            {/* <Space h="xs" /> */}

            { data.config.randomMode && (
                <Tooltip label={"Random patterns (" + data.config.randomDensity + ")"}>
                    <Code style={{ fontSize: "10px"}} color="blue" ml={4} >🎲</Code>
                </Tooltip>
            )}

            { data.config.effectsMode === "Glow" && (
                <Tooltip label={"Glow"}>
                    <Code style={{ fontSize: "10px"}} color="blue" ml={4}>💡</Code>
                </Tooltip>
            )}
        </>
    )
}
    
export default LabelsDisplayNav

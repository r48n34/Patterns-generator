import React from "react";
import { Group, Badge, Tooltip } from "@mantine/core";
import { PattenConfig, shapesIconMap } from "../../interface/shapesConfig";

type LabelsDisplayNavProps = {
    data: PattenConfig;
}

function LabelsDisplayNav({ data }: LabelsDisplayNavProps){
    return (
        <>
        <Group position="left">
            <Badge size="sm">{shapesIconMap[data.config.shapes]} {data.config.rows} x {data.config.cols}</Badge>
            { data.config.randomMode && (
                <Tooltip label={"Random patterns (" + data.config.randomDensity + ")"}>
                    <Badge size="sm" ml={-2}>🎲</Badge>
                </Tooltip>
            )}
        </Group>
        </>
    )
}
    
export default LabelsDisplayNav

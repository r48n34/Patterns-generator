import { ShapesGenData } from "../../app/interface/shapesConfig";
import { timer } from "../../app/utils/callFigma";
import { shapeIndArr } from "../interface/figmaTypes"
import { hexToRgb, glowEffectGen } from "./effectsUtils";

export async function createRectangles(msg){
    await timer(120);

    const nodes = [];
    const config: ShapesGenData = msg.data

    // Added 27/02/0204
    !config.shitfRows && (config.shitfRows = 0)
    !config.shitfCols && (config.shitfCols = 0)
    
    const shapeIndArr: shapeIndArr = {
        "Ellipse": { ind: 0, function: figma.createEllipse, overallFunction: generateShapeNode },
        "Polygon": { ind: 1, function: figma.createPolygon, overallFunction: generateShapeNode },
        "Star": { ind: 2, function: figma.createStar, overallFunction: generateShapeNode },
        "Rectangle": { ind: 3, function: figma.createRectangle, overallFunction: generateShapeNode },
        "Text": { ind: 4,  overallFunction: generateTextNode }, // Text
        "Star-4": { ind: 5, function: figma.createStar, overallFunction: generateShapeNode },
        "Line": { ind: 6, overallFunction: generateLineNode }, // Line
        "Ellipse-half": { ind: 7, function: figma.createEllipse, overallFunction: generateShapeNode },
        "Ellipse-one-four": { ind: 8, function: figma.createEllipse, overallFunction: generateShapeNode },
        "Star-8": { ind: 9, function: figma.createStar, overallFunction: generateShapeNode },
    }

    if(config.shapes === "Text"){
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    }

    for (let i = 0; i < config.rows; i++) {
        for (let k = 0; k < config.cols; k++) {

            if(config.randomMode && Math.random() >= config.randomDensity){
                continue;
            }

            const obj = shapeIndArr[config.shapes].overallFunction(
                config,
                i,
                k,
                shapeIndArr[config.shapes].function
            )
            
            nodes.push(obj);
            
        }
    }

    figma.group(nodes, figma.currentPage);

    if(config.flatten){
        figma.flatten(nodes, figma.currentPage);
    }

    figma.notify(`Success to generate ${config.shapes}`)
}

function generateTextNode(config: ShapesGenData, i: number, k: number): TextNode{

    const obj = figma.createText();

    const initialSpaceRows = k % 2 === 1 ? 0 : config.shitfRows;
    const initialSpaceCols = i % 2 === 1 ? 0 : config.shitfCols;

    obj.x = initialSpaceRows + figma.viewport.center.x + (i * config.paddingRows);
    obj.y = initialSpaceCols + figma.viewport.center.y + (k * config.paddingCols);

    (obj as TextNode).characters = config.textContent || "N/A";
    (obj as TextNode).fontSize   = config.shapeSize;
    obj.rotation = config.rotation || 0;

    const colorArr = config.color ? hexToRgb(config.color) : { r:1, g: 1, b: 1 };
    obj.fills = [{ type: "SOLID", color: colorArr }];

    if(config.effectsMode && config.effectsMode === "Glow"){
        const glowEffectList = glowEffectGen(
            config.shapeSize,
            config.effectsConfig.color,
            config.effectsConfig.intensity,
            config.effectsConfig.layers,
        )
        obj.effects = [...glowEffectList]
    }

    return obj;
}

function generateLineNode(config: ShapesGenData, i: number, k: number): LineNode{

    const obj = figma.createLine();

    const initialSpaceRows = k % 2 === 1 ? 0 : config.shitfRows;
    const initialSpaceCols = i % 2 === 1 ? 0 : config.shitfCols;

    obj.x = initialSpaceRows + figma.viewport.center.x + (i * config.paddingRows);
    obj.y = initialSpaceCols + figma.viewport.center.y + (k * config.paddingCols);

    obj.resize(config.shapeSize, 0);  
    obj.rotation = config.rotation || 0;
    obj.strokeWeight = 4

    const colorArr = config.color ? hexToRgb(config.color) : { r:1, g: 1, b: 1 };
    obj.strokes = [{ type: "SOLID", color: colorArr }];
    // obj.strokeCap = 'ARROW_LINES'

    if(config.effectsMode && config.effectsMode === "Glow"){
        const glowEffectList = glowEffectGen(
            config.shapeSize,
            config.effectsConfig.color,
            config.effectsConfig.intensity,
            config.effectsConfig.layers,
        )
        obj.effects = [...glowEffectList]
    }

    return obj;
}

function generateShapeNode(
    config: ShapesGenData,
    i: number,
    k: number,
    nodeFunc: (() => EllipseNode) | (() => PolygonNode) | (() => StarNode) | (() => RectangleNode)
):EllipseNode | PolygonNode | StarNode | RectangleNode{

    const obj = nodeFunc();

    const initialSpaceRows = k % 2 === 1 ? 0 : config.shitfRows;
    const initialSpaceCols = i % 2 === 1 ? 0 : config.shitfCols;

    obj.x = initialSpaceRows + figma.viewport.center.x + (i * config.paddingRows);
    obj.y = initialSpaceCols + figma.viewport.center.y + (k * config.paddingCols);

    if(config.shapes === "Star-4"){
        (obj as StarNode).pointCount = 4;
    }
    if(config.shapes === "Star-8"){
        (obj as StarNode).pointCount = 8;
    }
    else if(config.shapes === "Ellipse-half"){
        (obj as EllipseNode).arcData = {startingAngle: 0, endingAngle: Math.PI, innerRadius: 0}
    }
    else if(config.shapes === "Ellipse-one-four"){
        (obj as EllipseNode).arcData = {startingAngle: 0, endingAngle: Math.PI / 2, innerRadius: 0}
    }

    obj.rotation = config.rotation || 0;
    obj.resize(config.shapeSize, config.shapeSize);  

    const colorArr = config.color ? hexToRgb(config.color) : { r:1, g: 1, b: 1 };
    obj.fills = [{ type: "SOLID", color: colorArr }];

    if(config.effectsMode && config.effectsMode === "Glow"){
        const glowEffectList = glowEffectGen(
            config.shapeSize,
            config.effectsConfig.color,
            config.effectsConfig.intensity,
            config.effectsConfig.layers,
        )
        obj.effects = [...glowEffectList]
    }

    return obj;
}
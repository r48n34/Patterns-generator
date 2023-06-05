import { ShapesGenData } from "../../app/interface/shapesConfig";
import { timer } from "../../app/utils/callFigma";

// #121212
function hexToRgb(hex: string) {
    let bigint = parseInt(hex.replace("#",""), 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return {
        r: r / 255,
        g: g / 255,
        b: b / 255
    };
}

export async function createRectangles(msg){
    await timer(120);

    const nodes = [];
    const config: ShapesGenData = msg.data
    
    const shapeIndArr = {
        "Ellipse": { ind: 0, function: figma.createEllipse, overallFunction: generateShapeNode },
        "Polygon": { ind: 1, function: figma.createPolygon, overallFunction: generateShapeNode },
        "Star": { ind: 2, function: figma.createStar, overallFunction: generateShapeNode },
        "Rectangle": { ind: 3, function: figma.createRectangle, overallFunction: generateShapeNode },
        "Text": { ind: 4, function: () => {}, overallFunction: generateTextNode }, // Text
        "Star-4": { ind: 5, function: figma.createStar, overallFunction: generateShapeNode },
        "Line": { ind: 6, function: () => {}, overallFunction: generateLineNode }, // Line
    }

    if(config.shapes === "Text"){
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    }

    console.log(config.color);

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

    // nodes.forEach( v => figma.currentPage.appendChild(v) );
    // figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);

    figma.group(nodes, figma.currentPage)

    // This is how figma responds back to the ui
    // figma.ui.postMessage({
    //     type: "create-rectangles-done",
    //     message: `Created ${msg.count} Rectangles`,
    // });
}

function generateTextNode(config: ShapesGenData, i: number, k: number, _?:Function){

    const obj = figma.createText();

    obj.x = figma.viewport.center.x + (i * config.paddingRows);
    obj.y = figma.viewport.center.y + (k * config.paddingCols);

    (obj as TextNode).characters = config.textContent || "N/A";
    (obj as TextNode).fontSize   = config.shapeSize;

    const colorArr = config.color ? hexToRgb(config.color) : { r:1, g: 1, b: 1 };
    obj.fills = [{ type: "SOLID", color: colorArr }];
    return obj;
}

function generateLineNode(config: ShapesGenData, i: number, k: number, _?:Function){

    const obj = figma.createLine();

    obj.x = figma.viewport.center.x + (i * config.paddingRows);
    obj.y = figma.viewport.center.y + (k * config.paddingCols);

    obj.resize(config.shapeSize, 0);  
    obj.rotation = config.rotation || 0;
    obj.strokeWeight = 4
    // obj.stro

    const colorArr = config.color ? hexToRgb(config.color) : { r:1, g: 1, b: 1 };
    obj.strokes = [{ type: "SOLID", color: colorArr }];
    // obj.strokeCap = 'ARROW_LINES'

    return obj;
}

function generateShapeNode(
    config: ShapesGenData,
    i: number,
    k: number,
    nodeFunc: Function
){

    const obj = nodeFunc();

    obj.x = figma.viewport.center.x + (i * config.paddingRows);
    obj.y = figma.viewport.center.y + (k * config.paddingCols);

    if(config.shapes === "Star-4"){
        (obj as StarNode).pointCount = 4;
    }

    obj.rotation = config.rotation || 0;
    obj.resize(config.shapeSize, config.shapeSize);  

    const colorArr = config.color ? hexToRgb(config.color) : { r:1, g: 1, b: 1 };
    obj.fills = [{ type: "SOLID", color: colorArr }];

    return obj;
}
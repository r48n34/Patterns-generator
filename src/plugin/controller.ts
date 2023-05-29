import { ShapesGenData } from "../app/interface/shapesConfig";
import { timer } from "../app/utils/callFigma";
import { getFavouriteList } from "./settingUtils";

figma.showUI(__html__, {
    width: 400,
    height: 600
});

figma.ui.onmessage = async (msg) => {

    if (msg.type === "get-fav-list") {
        const data = await getFavouriteList();

        figma.ui.postMessage({
            type: "get-fav-list-done",
            message: data
        });
        
        return 
    }

    figma.ui.postMessage({
        type: "processing"
    });

    if (msg.type === "create-rectangles") {
        await createRectangles(msg);
    }
    else if (msg.type === "create-img") {
        await createImg()
    }

    figma.ui.postMessage({
        type: "done"
    });

    // figma.closePlugin();
};

async function createRectangles(msg){
    await timer(120);

    const nodes = [];
    const config: ShapesGenData = msg.data

    const currentX = figma.viewport.center.x
    const currentY = figma.viewport.center.y
    
    const shapeIndArr = {
        "Ellipse": { ind: 0, function: figma.createEllipse },
        "Polygon": { ind: 1, function: figma.createPolygon },
        "Star": { ind: 2, function: figma.createStar },
        "Rectangle": { ind: 3, function: figma.createRectangle },
    }

    for (let i = 0; i < config.rows; i++) {
        for (let k = 0; k < config.cols; k++) {
            const shapes = shapeIndArr[config.shapes].function()

            shapes.x = currentX + (i * config.paddingRows);
            shapes.y = currentY + (k * config.paddingCols);

            shapes.resize(config.shapeSize, config.shapeSize);
            shapes.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];

            nodes.push(shapes);
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

async function createImg(){
    // @ts-expect-error
    let image = await figma.createImageAsync('https://picsum.photos/200')
    const node = figma.createRectangle();

    const { width, height } = await image.getSizeAsync()
    node.resize(width, height)

    node.fills = [
        {
        type: 'IMAGE',
        imageHash: image.hash,
        scaleMode: 'FILL'
        }
    ]

    const text = figma.createText()
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    text.characters = 'Hello world!'

    text.fontSize = 90
    text.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]

    // This is how figma responds back to the ui
    // figma.ui.postMessage({
    //     type: "create-img",
    //     message: `Created ${msg.count} create-img`,
    // });
}

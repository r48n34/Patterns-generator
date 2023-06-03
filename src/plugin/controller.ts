import { ShapesGenData } from "../app/interface/shapesConfig";
import { timer } from "../app/utils/callFigma";
import { addNewFavourite, clearFavouriteList, editFavouriteList, getFavouriteList, removeFavourite } from "./settingUtils";

figma.showUI(__html__, {
    width: 400,
    height: 600
});

figma.ui.onmessage = async (msg) => {

    if (msg.type === "get-fav-list") {
        const data = await getFavouriteList();

        return figma.ui.postMessage({
            type: "get-fav-list-done",
            message: data
        });
        
    }

    if (msg.type === "add-fav-list") {
        await addNewFavourite(msg.data);
        return 
    }

    if (msg.type === "remove-one-fav-list-item") {
        await removeFavourite(msg.data);
        return 
    }

    if (msg.type === "clear-fav-list") {
        await clearFavouriteList();
        return 
    }

    if (msg.type === "edit-one-fav-list-item") {
        await editFavouriteList(msg.data);
        return 
    }


    figma.ui.postMessage({
        type: "processing"
    });

    if (msg.type === "create-rectangles") {
        await createRectangles(msg);
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
        "Text": { ind: 4, function: figma.createText },
        "Star-4": { ind: 5, function: figma.createStar },
        "Line": { ind: 6, function: figma.createLine },
    }

    if(config.shapes === "Text"){
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    }

    for (let i = 0; i < config.rows; i++) {
        for (let k = 0; k < config.cols; k++) {

            if(config.randomMode && Math.random() >= config.randomDensity){
                continue;
            }

            const obj = shapeIndArr[config.shapes].function()

            console.log("object", config.shapes);

            obj.x = currentX + (i * config.paddingRows);
            obj.y = currentY + (k * config.paddingCols);

            if(config.shapes === "Star-4"){
                (obj as StarNode).pointCount = 4
            }

            if(config.shapes === "Text"){
                (obj as TextNode).characters = config.textContent || "N/A";
                (obj as TextNode).fontSize   = config.shapeSize;
            }
            else {
                obj.resize(
                    config.shapeSize,
                    config.shapes === "Line" ? 0 : config.shapeSize
                );    
            }

            if(config.shapes === "Line"){
                obj.strokeWeight = 4
                obj.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
                // obj.strokeCap = 'ARROW_LINES'
            }
            else {
                obj.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
            }

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

// async function createImg(){
//     // @ts-expect-error
//     let image = await figma.createImageAsync('https://picsum.photos/200')
//     const node = figma.createRectangle();

//     const { width, height } = await image.getSizeAsync()
//     node.resize(width, height)

//     node.fills = [
//         {
//         type: 'IMAGE',
//         imageHash: image.hash,
//         scaleMode: 'FILL'
//         }
//     ]

//     const text = figma.createText()
//     await figma.loadFontAsync({ family: "Inter", style: "Regular" });
//     text.characters = 'Hello world!'

//     text.fontSize = 90
//     text.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]

//     // This is how figma responds back to the ui
//     // figma.ui.postMessage({
//     //     type: "create-img",
//     //     message: `Created ${msg.count} create-img`,
//     // });
// }

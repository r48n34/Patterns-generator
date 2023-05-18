import { ShapesGenData } from "../app/components/parts/MainParts";

figma.showUI(__html__, {
    width: 400,
    height: 600
});

figma.ui.onmessage = async (msg) => {
    if (msg.type === "create-rectangles") {

        const nodes = [];
        const config: ShapesGenData = msg.data

        const currentX = figma.viewport.center.x
        const currentY = figma.viewport.center.y


        for (let i = 0; i < config.rows; i++) {
            for (let k = 0; k < config.cols; k++) {
                // const rect = figma.createRectangle();
                // const rect = figma.createEllipse();

                // console.log(figma.viewport.center);

                const shapes = 
                    config.shapes === "Ellipse" 
                    ? figma.createEllipse() 
                    : config.shapes === "Polygon" 
                    ? figma.createPolygon()
                    : config.shapes === "Star" 
                    ? figma.createStar()
                    : figma.createRectangle();

                // rect.x = i * 110;
                shapes.x = currentX + (i * config.paddingRows);
                shapes.y = currentY + (k * config.paddingCols);

                // 40
                shapes.resize(config.shapeSize, config.shapeSize);
                shapes.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];

                figma.currentPage.appendChild(shapes);
                nodes.push(shapes);

            }
        }
        
        // figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
        figma.group(nodes, figma.currentPage)

        // This is how figma responds back to the ui
        figma.ui.postMessage({
            type: "create-rectangles",
            message: `Created ${msg.count} Rectangles`,
        });
    }

    if (msg.type === "create-img") {

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
        figma.ui.postMessage({
            type: "create-img",
            message: `Created ${msg.count} create-img`,
        });
    }

    // figma.closePlugin();
};

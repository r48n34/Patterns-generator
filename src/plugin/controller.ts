import { ShapesGenData } from "../app/components/parts/MainParts";

figma.showUI(__html__, {
    width: 400,
    height: 600
});

figma.ui.onmessage = async (msg) => {
    if (msg.type === "create-rectangles") {
        const nodes = [];

        const config: ShapesGenData = msg.data


        for (let i = 0; i < config.rows; i++) {
            for (let k = 0; k < config.cols; k++) {
                // const rect = figma.createRectangle();
                // const rect = figma.createEllipse();

                const rect = config.shapes === "Ellipse" ? figma.createEllipse() : figma.createRectangle();

                // rect.x = i * 110;
                rect.x = i * config.density;
                rect.y = k * config.density;

                // 40
                rect.resize(config.shapeSize, config.shapeSize);
                rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];

                figma.currentPage.appendChild(rect);
                nodes.push(rect);

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

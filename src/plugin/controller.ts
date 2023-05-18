figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
    if (msg.type === "create-rectangles") {
        const nodes = [];

        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }

        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);

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

        // This is how figma responds back to the ui
        figma.ui.postMessage({
            type: "create-img",
            message: `Created ${msg.count} create-img`,
        });
    }

    figma.closePlugin();
};

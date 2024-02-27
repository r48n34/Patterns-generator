import { addNewFavourite, clearFavouriteList, editFavouriteList, getFavouriteList, removeFavourite } from "./settingUtils";
import { createRectangles } from "./utils/createRectangles";

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

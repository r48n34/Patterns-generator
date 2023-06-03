import { PattenConfig, ShapesGenData } from "../interface/shapesConfig";

export function timer(t: number):Promise<void>{
    return new Promise( rec => setTimeout( () => rec(), t))
}

export function generateTemplate(data: ShapesGenData){
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', data: data } }, '*');
}

export function getFavList(){
    parent.postMessage({ pluginMessage: { type: 'get-fav-list' } }, '*');
}

export function addFavList(data: PattenConfig){
    parent.postMessage({ pluginMessage: { type: 'add-fav-list', data: data } }, '*');
}

export function clearFavList(){
    parent.postMessage({ pluginMessage: { type: 'clear-fav-list'  } }, '*');
}

export function removeFavListOneItem(title: string){
    parent.postMessage({ pluginMessage: { type: 'remove-one-fav-list-item', data: title  } }, '*');
}

export function editFavListOneItem(data: {title: string, newData: ShapesGenData}){
    parent.postMessage({ pluginMessage: { type: 'edit-one-fav-list-item', data: data  } }, '*');
}

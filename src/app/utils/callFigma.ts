import { ShapesGenData } from "../interface/shapesConfig";

export function timer(t: number):Promise<void>{
    return new Promise( rec => setTimeout( () => rec(), t))
}

export function generateTemplate(data: ShapesGenData){
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', data: data } }, '*');
}
import { ShapesGenData } from "../interface/shapesConfig";

export function toCompatibleShapesObject(values: ShapesGenData){

    const newObject = structuredClone(values)

    // For version compatible
    !newObject.hasOwnProperty("color")         && (newObject.color = "#FFFFFF")
    !newObject.hasOwnProperty("rotation")      && (newObject.rotation = 0)
    !newObject.hasOwnProperty("randomDensity") && (newObject.randomDensity = 1)
    !newObject.hasOwnProperty("effectsMode")   && (newObject.effectsMode = "Null")
    !newObject.hasOwnProperty("effectsConfig") && (newObject.effectsConfig = {
        color: "#FFFFFF",
        intensity: 1,
        layers: 5
    })
    !newObject.hasOwnProperty("flatten")       && (newObject.flatten = false)
    
    // 27/02/2024 Added
    !newObject.hasOwnProperty("shitfRows")     && (newObject.shitfRows = 0)
    !newObject.hasOwnProperty("shitfCols")     && (newObject.shitfCols = 0)

    return newObject
}
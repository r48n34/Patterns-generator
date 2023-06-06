import { ShapesData, ShapesGenData } from "../../app/interface/shapesConfig";

export type NodeFunctions = (() => EllipseNode) | (() => PolygonNode) | (() => StarNode) | (() => RectangleNode)

export interface ShapeContent {
    ind: number
    function?: NodeFunctions
    overallFunction: 
            ((config: ShapesGenData, i: number, k: number, nodeFunc: NodeFunctions) => EllipseNode | PolygonNode | StarNode | RectangleNode)
        |   ((config: ShapesGenData, i: number, k: number) => TextNode)
        |   ((config: ShapesGenData, i: number, k: number) => LineNode)
}

export type shapeIndArr = {
    [index in ShapesData]: ShapeContent;
};
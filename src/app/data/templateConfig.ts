import { ShapesGenData } from "../interface/shapesConfig"

export interface TemplateListData {
    title: string
    description: string
    config: ShapesGenData
}

export const templateList: TemplateListData[] = [
    {
        title: "Test",
        description: "Testing data",
        config: {
            rows: 15,
            cols: 15,
            paddingRows: 60,
            paddingCols: 60,
            density: 80,
            shapeSize: 25,
            shapes: "Ellipse",
        },
    },
    {
        title: "Test2",
        description: "Testing data2",
        config: {
            rows: 15,
            cols: 15,
            paddingRows: 60,
            paddingCols: 60,
            density: 80,
            shapeSize: 25,
            shapes: "Ellipse",
        },
    },
    {
        title: "Test3",
        description: "Testing data3",
        config: {
            rows: 15,
            cols: 15,
            paddingRows: 60,
            paddingCols: 60,
            density: 80,
            shapeSize: 25,
            shapes: "Ellipse",
        },
    },
    {
        title: "Test4",
        description: "Testing data4",
        config: {
            rows: 15,
            cols: 15,
            paddingRows: 60,
            paddingCols: 60,
            density: 80,
            shapeSize: 25,
            shapes: "Ellipse",
        },
    },
    {
        title: "Test5",
        description: "Testing data5",
        config: {
            rows: 15,
            cols: 15,
            paddingRows: 60,
            paddingCols: 60,
            density: 80,
            shapeSize: 25,
            shapes: "Ellipse",
        },
    }
]
import { PattenConfig } from "../interface/shapesConfig";

export const templateList: PattenConfig[] = [
    {
        title: "5 x 5 Small Ellipse",
        description: "Small Ellipse pattens",
        createDate: new Date(),
        config: {
            rows: 5,
            cols: 5,
            paddingRows: 60,
            paddingCols: 60,
            density: 60,
            shapeSize: 30,
            shapes: "Ellipse",
        },
    },
    {
        title: "15 x 15 Small Ellipse",
        description: "Small Ellipse pattens",
        createDate: new Date(),
        config: {
            rows: 15,
            cols: 15,
            paddingRows: 80,
            paddingCols: 80,
            density: 80,
            shapeSize: 25,
            shapes: "Ellipse",
        },
    },
    {
        title: "60 x 30 Small Ellipse",
        description: "Bg Ellipse pattens",
        createDate: new Date(),
        config: {
            rows: 60,
            cols: 30,
            paddingRows: 120,
            paddingCols: 120,
            density: 120,
            shapeSize: 20,
            shapes: "Ellipse",
        },
    },
    {
        title: "60 x 30 Small Ellipse v2",
        description: "Bg Ellipse pattens",
        createDate: new Date(),
        config: {
            rows: 60,
            cols: 30,
            paddingRows: 140,
            paddingCols: 140,
            density: 140,
            shapeSize: 18,
            shapes: "Ellipse",
        },
    },
    {
        title: "60 x 30 Small Ellipse v3",
        description: "Bg Ellipse pattens",
        createDate: new Date(),
        config: {
            rows: 60,
            cols: 30,
            paddingRows: 160,
            paddingCols: 160,
            density: 160,
            shapeSize: 16,
            shapes: "Ellipse",
        },
    },
]
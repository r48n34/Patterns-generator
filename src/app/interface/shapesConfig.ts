export interface ShapesGenData {
    rows: number,
    cols: number,
    paddingRows: number,
    paddingCols: number,
    density: number,
    shapeSize: number,
    shapes: "Ellipse" | "Rectangle" | "Polygon" | "Star",
}

export interface PattenConfig {
    title: string
    createDate: Date
    description: string
    config: ShapesGenData
}


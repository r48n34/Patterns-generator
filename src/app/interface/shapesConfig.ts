

export interface ShapesGenData {
    rows: number,
    cols: number,
    paddingRows: number,
    paddingCols: number,
    density: number,
    shapeSize: number,
    shapes: "Ellipse" | "Rectangle" | "Polygon" | "Star" | "Text",
    textContent?: string // If shapes === "Text", it shoule contains a textContent
}

export interface PattenConfig {
    title: string
    createDate: Date
    description: string
    config: ShapesGenData
}


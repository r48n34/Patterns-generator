export type ShapesData = "Ellipse" | "Rectangle" | "Polygon" | "Star" | "Text" | "Star-4" | "Line" | "Ellipse-half" | "Ellipse-one-four";

export interface ShapesGenData {
    rows: number, // Numbers of rows object
    cols: number, // Numbers of cols object

    paddingRows: number, // Each rows object padding
    paddingCols: number, // Each cols object padding

    // Added 27/02/2024
    shitfRows?: number, // Initial rows shifting space for event rows
    shitfCols?: number, // Initial rows shifting space for event rows

    density: number, // Padding of both x and y
    shapeSize: number, // Size
    shapes: ShapesData,
    rotation?: number, // 180 to -180
    color?: string,
    textContent?: string // If shapes === "Text", it shoule contains a textContent
    randomMode?: boolean // If true, the patterns generate will be in random
    randomDensity?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1 // For random number
    effectsMode?:  "Null" | "Glow"
    effectsConfig?: null | GeneralMode

    flatten?: boolean,
}

export interface GeneralMode {
    color: string,
    intensity: number,
    layers: number
}

export interface PattenConfig {
    title: string
    createDate: Date
    description: string
    config: ShapesGenData
}

export const shapesIconMap: Record<ShapesData, string> = {
    'Rectangle': '🟥 ',
    'Ellipse': '🔴',
    'Ellipse-half': '🌗',
    'Ellipse-one-four': '🕘',
    'Polygon': '🔻',
    'Star': '⭐',
    'Star-4': '✨',
    'Line': '➖ ',
    'Text': '🖊',
}


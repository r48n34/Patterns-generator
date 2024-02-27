import { z } from 'zod';

const shapesArr = ["Ellipse" , "Rectangle" , "Polygon" , "Star" , "Text" , "Star-4" , "Line" , "Ellipse-half" , "Ellipse-one-four"]
const randomDensityArr = [0.1 , 0.2 , 0.3 , 0.4 , 0.5 , 0.6 , 0.7 , 0.8 , 0.9 , 1]

export const genPatternsSchema = z.object({
    rows: z.number().min(1).positive(),
    cols: z.number().min(1).positive(),

    paddingRows: z.number().min(1).positive(),
    paddingCols: z.number().min(1).positive(),

    shitfRows: z.number().min(0).optional(),
    shitfCols: z.number().min(0).optional(),

    density: z.number().min(1).positive(),
    shapeSize: z.number().min(1).positive(),
    shapes: z.string().refine((v) => shapesArr.includes(v)),

    rotation: z.number().gte(-180).lte(180).optional(),
    color: z.string().optional(),
    textContent: z.string().optional(),
    
    randomMode: z.boolean().optional(),
    randomDensity: z.number().refine((v) => randomDensityArr.includes(v)).optional(),
    effectsMode: z.string().refine((v) => ["Null" , "Glow"].includes(v)).optional(),
    effectsConfig: z.object({
        color: z.string(),
        intensity: z.number().min(1).positive(),
        layers: z.number().min(1).positive(),
    }).optional(),

    flatten: z.boolean().optional(),
});

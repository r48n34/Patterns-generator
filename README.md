# Patterns generator

https://www.figma.com/community/plugin/1242738296070075685/Pattens-generator

![https://www.figma.com/community/plugin/1242738296070075685/Pattens-generator](/assert/banners2.png)

Wanna make shapes with patterns in figma? The plugin help you to create pattern
by a single clicks.

## Using stack

- React
- Mantine
- react-hot-toast
- zod

## References

This plugins is start with `Figma Plugin React Template` from
https://github.com/nirsky/figma-plugin-react-template

## Todo

- [x] Add favourite history
- [x] Edit favourite history
- [ ] Generate images patterns (TBD)
- [x] Generate text patterns
- [x] Search template / favourite slot
- [x] Random density and base color
- [x] Small card display UI
- [x] Glow / Effects mode on nodes
- [x] Import and export patterns for share and advance use

## Import and Export Guide

The Import and Export features are added in 24/07/2023, which allow users to
share their own patterns in a efficient ways.

A default patterns data will be like the following

```json
{
  "rows": 5,
  "cols": 5,
  "paddingRows": 80,
  "paddingCols": 80,
  "shitfRows": 0,
  "shitfCols": 0,
  "density": 80,
  "shapeSize": 25,
  "shapes": "Ellipse",
  "textContent": "",
  "color": "#FFFFFF",
  "randomMode": false,
  "randomDensity": 0.5,
  "rotation": 0,
  "effectsMode": "Null",
  "effectsConfig": {
    "color": "#FFFFFF",
    "intensity": 1,
    "layers": 6
  },
  "flatten": false
}
```

Here's the regarding types
```ts
export interface ShapesGenData {

    // How many object will be generate reagrding x and y
    rows: number, // >= 1 , y axis
    cols: number, // >= 1 , x axis

    // Padding of x and y
    paddingRows: number, // >= 1
    paddingCols: number, // >= 1

    // Added in 27/02/2024
    // For even rows / cols, the whole line will be shift x spacing
    shitfRows: number,
    shitfCols: number,

    // Padding of both x and y
    density: number, // >= 1

    // Shape Size
    shapeSize: number, // >= 1

    // Final shapes 
    shapes: "Ellipse" | "Rectangle" | "Polygon" | "Star" | "Text" | "Star-4" | "Line" | "Ellipse-half" | "Ellipse-one-four",

    // Angle of all object 
    rotation?: number, // 180 to -180

    // Color of all object
    color?: string, // e.g. #FF4301

    // If shapes === "Text", it shoule contains a textContent
    textContent?: string 

    // If true, the patterns generate will be in random, and "randomDensity" needs to be settle
    randomMode?: boolean 
    randomDensity?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1 // For random number
    
    // If effectsMode == "Glow", the "effectsConfig" needs to be settle
    effectsMode?:  "Null" | "Glow"
    effectsConfig?: null | {
        color: string,
        intensity: number,
        layers: number
    }

    // Will the final patterns be flatten
    flatten?: boolean,
}
```

In the `Patterns`, you will see the `Import` and `Export` buttons at the top left sections. Yet, you will also see the `Export Shapes` items in both `Template` and `Favourite` menu. 

By clicking the `Copy to Board` icon, you may export the shapes JSON and share to the `Import` functions.

## Logs

### 27/02/2024
- Added shitf Rows and Cols spacing for advance usage.
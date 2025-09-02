// #121212
type RGB = { r: number, g: number, b: number }
interface RGBA extends RGB { a: number }

export function hexToRgb(hex: string, a: number = -1): RGB | RGBA {
    let bigint = parseInt(hex.replace("#", ""), 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    if (a != -1) {
        return {
            r: r / 255,
            g: g / 255,
            b: b / 255,
            a: a
        } as RGBA
    }

    return {
        r: r / 255,
        g: g / 255,
        b: b / 255,
    } as RGB
}

// References from https://github.com/alexwidua/figma-glow/blob/master/src/utils/glow.ts#
export function glowEffectGen(
    shapeSize: number,
    color: string,
    intensity: number = 1,
    layers: number = 6
): DropShadowEffect[] {

    const glowMap = [1, 2, 7, 14, 24, 42].slice(0, Math.max(layers, 0)).map(v => {
        const scale = 8 * (shapeSize / 100)
        return {
            type: 'DROP_SHADOW',
            color: hexToRgb(color, intensity) as RGBA,
            offset: { x: 0, y: 0 },
            radius: scale * v,
            spread: 0,
            visible: true,
            blendMode: 'NORMAL'
        } as DropShadowEffect
    })

    return glowMap
}

export function glassEffectGen(intensity: number = 16): Effect[] {
    return [
        {
            type: 'BACKGROUND_BLUR',
            blurType: 'PROGRESSIVE',
            radius: intensity,
            startRadius: 0,
            startOffset: { x: 0, y: 0 },
            endOffset: { x: 1, y: 1 },
            visible: true,
        },
    ]
}

export function glassStrokesGen(): Paint[] {
    return [
        {
            type: "GRADIENT_LINEAR",
            gradientStops: [
                { position: 0, color: { r: 204 / 255, g: 204 / 255, b: 204 / 255, a: 0.5 } },
                { position: 1, color: { r: 86 / 255, g: 86 / 255, b: 86 / 255, a: 1 } }
            ],
            gradientTransform: [
                [1, 0, 0],
                [0, 1, 0],
            ],
            opacity: 0.5
        }
    ]
}
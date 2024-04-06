export const mainFontFamily = 'Inter'
export const logoFontFamily = 'Black Ops One'

export const daiblColor = `rgb(42, 112, 248)`
export const geminiColor = `rgb(119, 44, 232)`
export const whiteColor = `rgb(255, 255, 255)`
export const blackColor = `rgb(30, 39, 46)`
export const redColor = `rgb(255, 56, 56)`
export const greenColor = `rgb(50, 255, 126)`

export const whiteGradientColor = `linear-gradient( 109.6deg,  rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1% )`
export const blackGradientColor = `linear-gradient( 109.6deg,  rgba(20,30,48,1) 11.2%, rgba(36,59,85,1) 91.1% )`
export const daiblGradientColor = `linear-gradient( 249.1deg,  rgba(11,206,250,1) -6.5%, rgba(65,46,248,1) 100.2% )`
export const geminiGradientColor = `linear-gradient( 109.6deg,  rgba(119,44,232,0.68) 11.5%, rgba(119,44,232,1) 91.2% )`

export const getColorLevel = (color: string, level: number = 100): string => {
    let red: number
    let green: number
    let blue: number

    if (color.startsWith("#")) {
        if (color.length === 4) {
            color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
        }
        const hexValue = parseInt(color.slice(1), 16)
        red = (hexValue >> 16) & 255
        green = (hexValue >> 8) & 255
        blue = hexValue & 255
    } else {
        const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)

        if (match) {
            [, red, green, blue] = match.map(Number)
        } else {
            throw new Error("Mã màu không đúng định dạng.")
        }
    }

    if (level < 0 || level > 100) {
        throw new Error("Mức độ màu phải nằm trong khoảng từ 0 đến 100")
    }

    const alpha: number = level / 100
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}


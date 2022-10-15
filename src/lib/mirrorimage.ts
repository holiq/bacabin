const mirrorImages = [
    'https://mirrorimage-seven.vercel.app',
    'https://mirrorimage2.vercel.app',
    'https://mirrorimage3.vercel.app',
    'https://mirrorimage4.vercel.app',
    'https://mirrorimage5.vercel.app',
    'https://mirrorimage6.vercel.app',
    'https://mirrorimage7.vercel.app',
    'https://mirrorimage8.vercel.app',
    'https://mirrorimage9.vercel.app',
    'https://mirrorimage10.vercel.app',
    'https://mirrorimage11.vercel.app',
    'https://mirrorimage12.vercel.app',
    'https://mirrorimage13.vercel.app',
    'https://mirrorimage14.vercel.app',
    'https://mirrorimage15.vercel.app',
]
let index = 0
export const mirrorImage = () => {
    const mirror = mirrorImages[index]
    if (index === mirrorImages.length - 1) index = 0
    else index++
    return mirror
}
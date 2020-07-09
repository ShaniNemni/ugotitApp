const utilsPath = './';

export const allImages = {
    defaultProfile:require(`${utilsPath}profile.png`),
    loading:require(`${utilsPath}loading_gif.gif`)
};



export function getImage(imageName) {
    return allImages[imageName];
}
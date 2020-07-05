const utilsPath = './';

export const allImages = {
    defaultProfile:require(`${utilsPath}profile.png`)
};

export function getImage(imageName) {
    return allImages[imageName];
}
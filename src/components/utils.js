import {partData} from "./part_Data";

export function getManufacturerImg (manufacturer) {
    return `${process.env.PUBLIC_URL}/images/Manufacturers/${manufacturer.replace(" ","_")}.png`;
}

export function getPartImage(category, part) {

    console.warn(`Getting image for ${category}: ${part}`);
    let dataCategory = category;
    if (!part || !part.name) {
        if (["LeftArm", "RightArm", "LeftBack", "RightBack"].includes(category)) {
            dataCategory = "unit";
        }
        console.warn(`No part selected for ${dataCategory}`);
        const categoryData = partData[dataCategory];
        const firstPartKey = Object.keys(categoryData)[0];
        return `${process.env.PUBLIC_URL}/images/${dataCategory}/${categoryData[firstPartKey]["Image"]}`;
    }

    try {
        let partName = part.name;

        // Handle weapon placements (they use "unit" data)
        if (["LeftArm", "RightArm", "LeftBack", "RightBack"].includes(category)) {
            dataCategory = "unit";
        }
        // Get the part data
        const partDataEntry = partData[dataCategory][partName];
        const imageName = partDataEntry["Image"];

        // Determine the folder based on category
        let folder = category;
        if (category === "LeftArm" || category === "RightArm" || category === "LeftBack" || category === "RightBack") {
            folder = "unit";
        }

        return `${process.env.PUBLIC_URL}/images/${folder}/${imageName}`;

    } catch (error) {
        console.error(`Error getting image for ${category}:`, error);
        return null;
    }
}
export function getPartImages(selected_Parts) {
   const partImages = {};
    Object.entries(selected_Parts).forEach(([category, part]) => {
        // Only try to get image if part is not null
        partImages[category] = getPartImage(category, part);
    });
    return partImages;
}

export function hasNoPart(selected_Parts, category){
    category=category.replace(" ", "")
    const part = selected_Parts[category];
    return !part || !part.name;
}

// Special handling for arm images (left/right variants)
export function getArmImage (selected_Parts, side) {
    const armPart = selected_Parts.arms;

    // Check if arm part exists and has a name
    if (!armPart || !armPart.name) {
        console.log(`No arm part selected for ${side}`);
        // Get the first arm part for fallback
        const firstArmKey = Object.keys(partData.arms)[0];
        const fallbackImage = partData.arms[firstArmKey].Image;
        return `${process.env.PUBLIC_URL}/images/Arms/${side.charAt(0).toUpperCase() + side.slice(1)}/${fallbackImage}`;
    }

    try {
        const armData = partData.arms[armPart.name];
        if (!armData || !armData.Image) return null;

        const baseImage = armData.Image;
        // Assuming arm images follow naming convention: baseName_L.png and baseName_R.png
        const sideSuffix = side === 'left' ? '_L' : '_R';
        const sideImage = baseImage.replace('.png', `${sideSuffix}.png`);

        return `${process.env.PUBLIC_URL}/images/Arms/${side.charAt(0).toUpperCase() + side.slice(1)}/${sideImage}`;
    } catch (error) {
        console.error(`Error getting ${side} arm image:`, error);
        return null;
    }
}

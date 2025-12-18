import './parts_display.css'
import {partData} from "../../components/part_Data";
import React from "react";

function PartsDisplay({category, weapon_placement, handlePartSelect, handlePartHover, hoveredPart}) {
    let selected_Category = category;

    const filteredParts = Object.keys(partData[selected_Category] || {}).filter((part_data) => {
        if (selected_Category === "unit") {
            const current_Weapon_Placement = weapon_placement.replaceAll(" ", "");
            const each_part_data = partData[selected_Category][part_data];
            const canEquip = each_part_data[current_Weapon_Placement];
            return canEquip === true;
        }
        return true;
    });

    const handleImageError = (e) => {
        console.warn(`Image failed to load: ${e.target.src}`);
        e.target.style.display = 'none';
    };

    const handleImageLoad = (e) => {
        e.target.style.display = 'block';
    };
    console.log(`Parts display filteredParts : ${filteredParts}`)
    return (
        <div className="items-grid">
            {filteredParts.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    color: '#8FABD4',
                    padding: '2rem',
                    fontStyle: 'italic'
                }}>
                    No parts available for this category
                </div>
            ) : (

                filteredParts.map((part_data) => {
                    const each_part_data = partData[selected_Category][part_data];
                    console.log(`Parts display each_part_data : ${each_part_data}`)
                    const imageName = each_part_data?.["Image"];
                    console.log(`Parts display imageName: ${imageName}`)
                    let change_selected_Category = selected_Category
                    if (change_selected_Category==="fcs")
                        change_selected_Category="FCS"
                    else
                        change_selected_Category = change_selected_Category.charAt(0).toUpperCase()
                            + change_selected_Category.slice(1)
                    console.log(`Parts display selected_Category: ${change_selected_Category} `)
                    const imagePath = imageName
                        ? `${process.env.PUBLIC_URL}/images/${change_selected_Category}/${imageName}`
                        : `${process.env.PUBLIC_URL}/images/fallback-part.png`;

                    const isHovered = hoveredPart === part_data;
                    const partClass = isHovered ? "part-hovered" : "";

                    return (
                        <img
                            key={part_data}
                            src={imagePath}
                            alt={each_part_data?.["Name"] || "AC Part"}
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            onClick={() => handlePartSelect(part_data)}
                            onMouseEnter={() => handlePartHover(part_data)}
                            // onMouseLeave={() => handlePartHover(null)}
                            className={partClass}
                            loading="lazy"
                        />
                    );
                })
            )}
        </div>
    );
}

export default PartsDisplay;
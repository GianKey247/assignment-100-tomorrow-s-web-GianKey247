import Stats_display from "./stats_display";
import Parts_display from "./parts_display";
import "./PartSelectionModal.css"
import React from "react";
import Portal from "../../components/Portal/Portal";

function PartSelectionModal({isOpen, setIsOpen, category, weapon_placement, selected_Part, setSelectedPart}){
    // State for tracking currently hovered part
    const [hoveredPart, setHoveredPart] = React.useState(null);

    const handlePartSelect = (part) => {
        console.log("PartSelectionModal - Part selected:", part);
        setSelectedPart(part);
        setHoveredPart(null);
        setIsOpen(false);
    };

    const handlePartHover = (part) => {
        setHoveredPart(part);
    };

    const handlePartClear = () => {
        console.log("PartSelectionModal - Clearing part");
        setSelectedPart(null);
        setHoveredPart(null);
        setIsOpen(false);
    };

    // Fixed hover logic: hovered part takes precedence, then selected part, then first part
    let partToDisplay;
    if (hoveredPart) {
        partToDisplay = { name: hoveredPart };
    }
    else if (selected_Part && selected_Part.name) {
        partToDisplay = selected_Part;
    } else {
        // Default to first part in category
        const categoryParts = Object.keys(require("../../components/part_Data").partData[category] || {});
        if (categoryParts.length > 0) {
            partToDisplay = { name: categoryParts[0] };
        } else {
            partToDisplay = null;
        }
    }

    console.log("modal partToDisplay:", partToDisplay);
    console.log("modal selected_Part:", selected_Part);
    console.log("Modal Hovered Part", hoveredPart)


    // Return null if modal is not open
    if (!isOpen) return null;

    return (
        <Portal>
            <div className="modal">
                <div className="modal-content">
                    <div className="button_Container">
                        <button className={"button_PartClear"} onClick={handlePartClear}>
                            Deselect Part
                        </button>
                        <button className={"button_Close"} onClick={() => setIsOpen(false)}>
                            ×
                        </button>
                    </div>

                    <div className="modal-equipment">
                        <div className="modal-parts">
                            <Parts_display
                                category={category}
                                weapon_placement={weapon_placement}
                                handlePartSelect={handlePartSelect}
                                handlePartHover={handlePartHover}
                                hoveredPart={hoveredPart}
                            />
                        </div>
                        <div className="modal-stats">
                            <Stats_display
                                selected_Catagory={category}
                                selected_Part={partToDisplay}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default PartSelectionModal;
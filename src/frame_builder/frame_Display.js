import "./frame_Display.css"
import {getArmImage, getPartImages, hasNoPart} from "../components/utils";


function FrameDisplay({selected_Parts}){
    console.log("FrameDisplay selected_Parts:", selected_Parts);

    // Helper function to get image path for a part

    const armLImage = getArmImage(selected_Parts,'left');
    const armRImage = getArmImage(selected_Parts,'right');
    const partImages = getPartImages(selected_Parts);
    return (
        <div className={"frame-display"}>
            {/* Frame Parts - set opacity to 0 if no part is selected */}
            <img
                className={"weapon_shoulder_left_Display"}
                style={{opacity: hasNoPart(selected_Parts,"RightBack") ? 0 : 1}}
                src={partImages.RightBack}
                alt="Head Part"
            />
            <img
                className={"head_Display"}
                style={{opacity: hasNoPart(selected_Parts,"head") ? 0 : 1}}
                src={partImages.head}
                alt="Head Part"
            />
            <img
                className={"weapon_shoulder_right_Display"}
                style={{opacity: hasNoPart(selected_Parts,"LeftBack") ? 0 : 1}}
                src={partImages.LeftBack}
                alt="Head Part"
            />
            <img
                className={"armL_Display"}
                style={{opacity: hasNoPart(selected_Parts,"arms") ? 0 : 1}}
                src={armLImage}
                alt="Left Arm Part"
            />
            <img
                className={"core_Display"}
                style={{opacity: hasNoPart(selected_Parts,"core") ? 0 : 1}}
                src={partImages.core}
                alt="Core Part"
            />
            <img
                className={"armR_Display"}
                style={{opacity: hasNoPart(selected_Parts,"arms") ? 0 : 1}}
                src={armRImage}
                alt="Right Arm Part"
            />
            <img
                className={"weapon_left_Display"}
                style={{opacity: hasNoPart(selected_Parts,"RightArm") ? 0 : 1}}
                src={partImages.RightArm}
                alt="Head Part"
            />
            <img
                className={"legs_Display"}
                style={{opacity: hasNoPart(selected_Parts,"legs") ? 0 : 1}}
                src={partImages.legs}
                alt="Legs Part"
            />
            <img
                className={"weapon_right_Display"}
                style={{opacity: hasNoPart(selected_Parts,"LeftArm") ? 0 : 1}}
                src={partImages.LeftArm}
                alt="Head Part"
            />

            {/* Fallback for when no parts are selected */}
            {Object.values(selected_Parts).every(part => !part || !part.name) && (
                <div className="no-parts-message">
                    No parts selected
                </div>
            )}
        </div>
    )
}

export default FrameDisplay;
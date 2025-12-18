import "./information_Display.css"
import React from "react";

function InformationDisplay({selectedInfo, selectedInfoKey}){
    const hasVideo = selectedInfo && selectedInfo["video"];

    return (
        <div className={"container-InfoDisplay"}>
            <h2>{selectedInfoKey || "Information"}</h2>

            {hasVideo ? (
                <video
                    src={selectedInfo["video"]}
                    muted
                    autoPlay
                    loop
                    playsInline
                    onError={(e) => {
                        console.warn("Video failed to load:", selectedInfo["video"]);
                        e.target.style.display = 'none';
                        // You could set a state here to show placeholder instead
                    }}
                />
            ) : (
                <div className="video-placeholder">
                    Video Not Available
                </div>
            )}

            <p>
                {selectedInfo && selectedInfo["description"]
                    ? selectedInfo["description"]
                    : "No description available for this topic."}
            </p>
        </div>
    )
}

export default InformationDisplay;
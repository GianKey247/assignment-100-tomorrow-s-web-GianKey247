import info_data from "../../part_data/info.json";
import "./information_Labels.css"
import React from "react";

function InformationLabels({ handleInfoHover, selectedInfoKey }){
    const button_InfoButton = Object.entries(info_data).map(([key, value]) => {
        const isActive = selectedInfoKey === key;

        return (
            <div className="info-stat-row" key={key}>
                <span
                    className={`stat-name ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => handleInfoHover(key, value)}
                    onClick={() => handleInfoHover(key, value)} // Add click support for mobile
                >
                    {key}
                </span>
            </div>
        );
    });

    return (
        <div className={"container-InfoButton"}>
            {button_InfoButton.length > 0 ? button_InfoButton : (
                <div style={{
                    color: '#8FABD4',
                    textAlign: 'center',
                    padding: '1rem',
                    fontStyle: 'italic'
                }}>
                    No information categories available
                </div>
            )}
        </div>
    )
}

export default InformationLabels;
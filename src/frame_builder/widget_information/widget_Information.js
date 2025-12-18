import info_data from "../../part_data/info.json";
import "./widget_Information.css"
import InformationLabels from "./information_Labels";
import Information_Display from "./information_Display";
import React, {useState, useEffect} from "react";

function WidgetInformation(){
    console.log("info data : ", info_data);

    const [selectedInfo, setSelectedInfo] = useState(null);
    const [selectedInfoKey, setSelectedKey] = useState(null);

    // Initialize with first item when component mounts
    useEffect(() => {
        if (Object.keys(info_data).length > 0 && !selectedInfoKey) {
            const firstKey = Object.keys(info_data)[0];
            setSelectedKey(firstKey);
            setSelectedInfo(info_data[firstKey]);
        }
    }, [info_data, selectedInfoKey]);

    const handleInfoHover = (key, info) => {
        setSelectedInfo(info);
        setSelectedKey(key);
        console.log("Selected info: ", info);
    };

    if (Object.keys(info_data).length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                color: '#8FABD4',
                padding: '2rem',
                background: 'linear-gradient(135deg, #000000 0%, #4A70A9 100%)',
                borderRadius: '15px',
                border: '3px solid #8FABD4'
            }}>
                No information data available
            </div>
        );
    }

    return (
        <div className={"container-InfoWidget"}>
            <InformationLabels
                handleInfoHover={handleInfoHover}
                selectedInfoKey={selectedInfoKey}
            />
            <Information_Display
                selectedInfo={selectedInfo}
                selectedInfoKey={selectedInfoKey}
            />
        </div>
    )
}

export default WidgetInformation;
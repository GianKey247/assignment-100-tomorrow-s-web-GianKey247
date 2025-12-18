import './stat_display.css'
import {partData} from "../../components/part_Data";
import BarCalculations from "../../components/bar_Calculations";
import React from "react";
import {getManufacturerImg} from "../../components/utils";

let ignore_stats = [
    'RightArm', 'LeftArm', 'RightBack', 'LeftBack',
    'IsEnergyFirearmSpec', 'IsMeleeSpec', "DefaultOrdering",
    "Image", "Kind", "Manufacturer", "Weight", "ENLoad",
    "Name", "Description", "AttackType", "WeaponType",
    "ReloadType", "AdditionalEffect"
]

let invert_progress = [
    "Weight", "UpwardENConsumption", "QBENConsumption", "QBReloadTime",
    "MeleeAtkENConsump", "ReloadTime", "ATKHeatBuildup", "Recoil",
    "ChgAmmoConsumption", "ChgENLoad", "ChgHeatBuildup", "FullChgAmmoConsump",
    "HomingLockTime", "FullChgBulletSpeed", "AmmunitionCost"
]

function StatsDisplay({selected_Catagory, selected_Part}) {
    const [partDataState, setPartDataState] = React.useState(null);
    const [minMaxVal, setMinMaxVal] = React.useState(null);

    React.useEffect(() => {
        if (selected_Catagory) {
            const calculated = BarCalculations(selected_Catagory);
            setMinMaxVal(calculated);
        }
    }, [selected_Catagory]);

    // Handle case where no part is selected or part data is not available
    let selected_Part_data = null;

    if (selected_Part && selected_Part.name && partData[selected_Catagory]) {
        selected_Part_data = partData[selected_Catagory][selected_Part.name];
    }

    if (!selected_Part_data && partData[selected_Catagory]) {
        // Get the first part in the category as default
        const categoryParts = Object.keys(partData[selected_Catagory]);
        if (categoryParts.length > 0) {
            selected_Part_data = partData[selected_Catagory][categoryParts[0]];
        }
    }

    if (!selected_Part_data || !minMaxVal) {
        return (
            <div style={{
                color: '#8FABD4',
                textAlign: 'center',
                padding: '2rem',
                fontStyle: 'italic'
            }}>
                {!minMaxVal ? 'Loading stats...' : 'No part data available'}
            </div>
        );
    }

    const selected_Part_Entries = [];

    for (const key in selected_Part_data) {
        if (ignore_stats.includes(key)) {
            continue;
        }
        const value = selected_Part_data[key];

        if (value !== null && value !== undefined) {
            let percentageValue = 0;
            let total_Value = 0;

            if (typeof value === 'number') {
                total_Value = value;
            } else if (typeof value === "object" && Array.isArray(value) && value.length === 2) {
                total_Value = value[0] * value[1];
            } else {
                continue; // Skip non-numeric values
            }

            const min_Value = minMaxVal.lowest_values_stats[key];
            const max_Value = minMaxVal.highest_values_stats[key];

            // Ensure we have valid min/max values
            if (min_Value === undefined || max_Value === undefined || min_Value === max_Value) {
                percentageValue = 0.5; // Default to middle if no range
            } else if (invert_progress.includes(key)) {
                percentageValue = 1 - (total_Value - min_Value) / (max_Value - min_Value);
            } else {
                percentageValue = (total_Value - min_Value) / (max_Value - min_Value);
            }

            // Ensure percentage is between 0 and 1
            percentageValue = Math.max(0, Math.min(1, percentageValue));

            selected_Part_Entries.push(
                <div key={key} className="stat-row">
                    <span className="stat-name">{key}:</span>
                    <progress value={percentageValue} className="stat-progress" max="1" />
                    <span className="stat-value">{total_Value.toLocaleString()}</span>
                </div>
            );
        }
    }

    return (
        <div className={"stats-container"}>
            <div className={"container-Banner"}>
                <div className="stat-Label">
                    <span className="stat-name">Name:</span>
                    <span className="stat-value">{selected_Part_data["Name"] || "Unknown Part"}</span>
                </div>
                <div className="stat-Label">
                    <span className="stat-name">Description:</span>
                    <span
                        className="stat-value">{selected_Part_data["Description"] || selected_Part_data["LegType"] || "No description available"}</span>
                </div>
                {selected_Part_data["Manufacturer"]!== undefined &&
                    <img className={"stat-Manufacturer"} src={getManufacturerImg(selected_Part_data["Manufacturer"])}/>
                }

            </div>


            <div className="stat-rows">
                {selected_Part_Entries.length > 0 ? selected_Part_Entries : (
                    <div style={{color: '#8FABD4', textAlign: 'center', padding: '1rem'}}>
                        No stat data available
                    </div>
                )}
            </div>

            <div className={"stat-EN&Weight"}>
                <div className="stat-Weight">
                    <span className="stat-name">Weight:</span>
                    <progress
                        value={1 - ((selected_Part_data['Weight'] - minMaxVal.lowest_values_stats['Weight']) /
                            (minMaxVal.highest_values_stats['Weight'] - minMaxVal.lowest_values_stats['Weight']))}
                        className="stat-progress"
                        max="1"
                    />
                    <span className="stat-value">{selected_Part_data["Weight"]?.toLocaleString() || 0}</span>
                </div>
                <div className="stat-ENLoad">
                    <span className="stat-name">EN Load:</span>
                    <progress
                        value={(selected_Part_data['ENLoad'] - minMaxVal.lowest_values_stats['ENLoad']) /
                            (minMaxVal.highest_values_stats['ENLoad'] - minMaxVal.lowest_values_stats['ENLoad'])}
                        className="stat-progress"
                        max="1"
                    />
                    <span className="stat-value">{selected_Part_data["ENLoad"]?.toLocaleString() || 0}</span>
                </div>
            </div>
        </div>
    )
}

export default StatsDisplay;
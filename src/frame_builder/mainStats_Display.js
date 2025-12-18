// mainStats_Display.js
import "./mainStats_Display.css"
import React, {useState, useEffect} from "react";
import {Calculations} from "../components/calculations";

function MainStatsDisplay({selected_Parts,user,setUser}) {
    console.log("MainStatsDisplay selected_Parts: ", selected_Parts)
    const [totalStats, setTotalStats] = useState({});
    const [activeTab, setActiveTab] = useState("combat"); // Default to combat tab

    useEffect(() => {
        const computedStats = Calculations(selected_Parts);
        setTotalStats(computedStats);
    }, [selected_Parts]);

    // Helper function to determine if a stat is critical
    const getStatStatus = (statName, value) => {
        if (!value) return '';

        switch(statName) {
            case "Total Load":
                return value > (totalStats.loadLimit || 0) ? 'critical' : '';
            case "Total Arm Load":
                return value > (totalStats.armsLoadLimit || 0) ? 'critical' : '';
            case "Total EN Load":
                return value > (totalStats.ENOutput || 0) ? 'critical' : '';
            case "AP":
                return value < 8000 ? 'critical' : value > 12000 ? 'optimal' : '';
            case "Attitude Stability":
                return value < 1000 ? 'critical' : value > 1800 ? 'optimal' : '';
            default:
                return '';
        }
    };

    // Organized stat groups
    const statGroups = {
        combat: {
            name: "COMBAT PERFORMANCE",
            stats: [
                {name: "AP", value: totalStats.AP},
                {name: "Attitude Stability", value: totalStats.attitudeStability},
                {name: "Anti-Kinetic Defense", value: totalStats.antiKineticDefense},
                {name: "Anti-Energy Defense", value: totalStats.antiEnergyDefense},
                {name: "Anti-Explosive Defense", value: totalStats.antiExplosiveDefense},
                {name: "Attitude Recovery", value: totalStats.attitudeRecovery},
            ]
        },
        mobility: {
            name: "MOBILITY SYSTEMS",
            stats: [
                {name: "Target Tracking", value: totalStats.targetTracking},
                {name: "QB Speed", value: totalStats.QBSpeed},
                {name: "QB EN Consumption", value: totalStats.QBENConsumption},
                {name: "QB Reload Time", value: totalStats.QBReloadTime},
            ]
        },
        energy: {
            name: "ENERGY SYSTEMS",
            stats: [
                {name: "EN Capacity", value: totalStats.ENCapacity},
                {name: "EN Supply Efficiency", value: totalStats.enSupplyEfficiency},
                {name: "EN Recharge Delay", value: totalStats.enRechargeDelay},
            ]
        },
        load: {
            name: "LOAD MANAGEMENT",
            stats: [
                {name: "Total Arm Load", value: totalStats.armLoad},
                {name: "Arms Load Limit", value: totalStats.armsLoadLimit},
                {name: "Total Load", value: totalStats.totalLoad},
                {name: "Load Limit", value: totalStats.loadLimit},
                {name: "Total Weight", value: totalStats.weight},
                {name: "Total EN Load", value: totalStats.ENLoad},
                {name: "Total EN Output", value: totalStats.ENOutput},
            ]
        }
    };

    const formatValue = (value) => {
        if (value === null || value === undefined) return "N/A";
        if (typeof value === 'number') {
            return value.toLocaleString();
        }
        return value;
    };

    // Check for critical warnings
    const hasCriticalWarnings = totalStats.totalLoad > totalStats.loadLimit ||
        totalStats.armLoad > totalStats.armsLoadLimit ||
        totalStats.ENLoad > totalStats.ENOutput;

    return (
        <div className="mainStats_Display">
            {/* Tab Navigation */}
            <div className="stats-tabs">
                <button
                    className={`tab-button ${activeTab === 'combat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('combat')}
                >
                    Combat
                </button>
                <button
                    className={`tab-button ${activeTab === 'mobility' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mobility')}
                >
                    Mobility
                </button>
                <button
                    className={`tab-button ${activeTab === 'energy' ? 'active' : ''}`}
                    onClick={() => setActiveTab('energy')}
                >
                    Energy
                </button>
                <button
                    className={`tab-button ${activeTab === 'load' ? 'active' : ''}`}
                    onClick={() => setActiveTab('load')}
                >
                    Load
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                <div className="main_Stat_row stat-section">
                    <span className="main_stat_name">{statGroups[activeTab].name}</span>
                    <span className="main_stat_value"></span>
                </div>

                {statGroups[activeTab].stats.map((stat, statIndex) => (
                    <div
                        className={`main_Stat_row ${getStatStatus(stat.name, stat.value)}`}
                        key={statIndex}
                    >
                        <span className="main_stat_name">{stat.name}</span>
                        <span className="main_stat_value">{formatValue(stat.value)}</span>
                    </div>
                ))}

                {/* Critical warnings summary - show on all tabs if applicable */}
                {hasCriticalWarnings && (
                    <div className="main_Stat_row critical" style={{marginTop: '1rem'}}>
                        <span className="main_stat_name">⚠️ CRITICAL WARNINGS</span>
                        <span className="main_stat_value">CHECK LOAD LIMITS</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MainStatsDisplay;
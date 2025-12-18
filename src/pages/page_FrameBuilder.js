import FullTable from "../frame_builder/fulltable/full_Table";
import FrameDisplay from "../frame_builder/frame_Display";
import MainStatsDisplay from "../frame_builder/mainStats_Display";
import React, {useState} from "react";
import "./page_FrameBuilder.css"
import WidgetInformation from "../frame_builder/widget_information/widget_Information";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
);

function PageFrameBuilder({user, setUser}){
    const [selectedPartsDict, setSelectedPartsDict] = useState(() => {
        return {
            "head" :{ "name" : "HC-2000_FINDER_EYE" },
            "core" : { "name" : "CC-2000_ORBITER" },
            "arms" : { "name" : "AC-2000_TOOL_ARM" },
            "legs" : { "name" : "2C-2000_CRAWLER" },
            "generator" : { "name" : "AG-J-098_JOSO" },
            "fcs" : { "name" : "FCS-G1_P01" },
            "expansion" : { "name" : null },
            "booster" : { "name" : "BST-G1_P10" },
            "LeftArm" : { "name" : "HI-32_BU-TT_A" },
            "RightArm" : { "name" : "RF-024_TURNER" },
            "LeftBack" : { "name" : null },
            "RightBack" : { "name" : "BML-G1_P20MLT-04" },
        }
    });

    const [message, setMessage] = useState("");
    const [buildData, setBuildData] = useState({
        buildName: '',
        buildConfig: {}
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBuildData(prev => ({
            ...prev,
            [name]: value
        }));
        if (message) setMessage("");
    };

    const handleSaveBuild = async () => {
        if (!buildData.buildName.trim()) {
            setMessage('Please enter a build name');
            return;
        }

        if (!user.UserName) {
            setMessage('Please log in to save builds');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            // Update the user's SavedBuilds with the new build
            const currentBuilds = user.SavedBuilds || {};
            const updatedBuilds = {
                ...currentBuilds,
                [buildData.buildName]: selectedPartsDict
            };

            const { error } = await supabase
                .from('users')
                .update({ SavedBuilds: updatedBuilds })
                .eq('UserName', user.UserName);

            if (error) {
                setMessage('Error saving build');
                return;
            }

            setMessage('Build saved successfully!');
            setUser(prev => ({ ...prev, SavedBuilds: updatedBuilds }));
            setBuildData({buildName: '', buildConfig: {}});
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage('Error saving build - Server unavailable');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewBuild = () => {
        setSelectedPartsDict({
            "head" :{ "name" : "HC-2000_FINDER_EYE" },
            "core" : { "name" : "CC-2000_ORBITER" },
            "arms" : { "name" : "AC-2000_TOOL_ARM" },
            "legs" : { "name" : "2C-2000_CRAWLER" },
            "generator" : { "name" : "AG-J-098_JOSO" },
            "fcs" : { "name" : "FCS-G1_P01" },
            "expansion" : { "name" : null },
            "booster" : { "name" : "BST-G1_P10" },
            "LeftArm" : { "name" : "HI-32_BU-TT_A" },
            "RightArm" : { "name" : "RF-024_TURNER" },
            "LeftBack" : { "name" : null },
            "RightBack" : { "name" : "BML-G1_P20MLT-04" },
        });
        setBuildData({buildName: '', buildConfig: {}});
        setMessage("New build created!");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <>
            <div className={"container-FrameBuilderTitle"}>
                <h1>Customizable AC</h1>
                <h3>Build a AC that suits a mission or play one build so well you beat everything your way</h3>
            </div>

            <div className="container-FrameBuilder">
                {/* Left Column - Parts Table */}
                <div className="full-table-container">
                    <FullTable
                        selected_Parts={selectedPartsDict}
                        set_selected_Parts={setSelectedPartsDict}
                        user={user}
                    />
                </div>

                {/* Middle Column - Frame Display */}
                <div className="frame-display-container">
                    <FrameDisplay selected_Parts={selectedPartsDict}/>
                </div>

                {/* Right Column - Save Build & Stats */}
                <div className="right-column">
                    <div className="save-build-section">
                        <div className="save_new-Build">
                            <input
                                type="text"
                                name="buildName"
                                className={"input-BuildName"}
                                onChange={handleChange}
                                value={buildData.buildName}
                                placeholder="Enter build name..."
                                required
                                disabled={loading}
                            />
                            <button
                                className="saveBuild-Button"
                                onClick={handleSaveBuild}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Build"}
                            </button>
                            <button
                                className="newBuild-Button"
                                onClick={handleNewBuild}
                                disabled={loading}
                            >
                                New Build
                            </button>
                        </div>

                        {message && (
                            <div className={`message ${message.includes("successfully") || message.includes("created") ? "success" : "error"}`}>
                                {message}
                            </div>
                        )}
                    </div>

                    <div className="stats-section">
                        <MainStatsDisplay
                            selected_Parts={selectedPartsDict}
                            user={user}
                            setUser={setUser}
                        />
                    </div>
                </div>
            </div>

            <div className={"container-Info"}>
                <h3>General Part Information</h3>
                <WidgetInformation/>
            </div>

            <div className={"container-WeightSection"}>
                <h2>Weight Classes</h2>
                <div className={"container-WeightClasses"}>
                    <div className={"container-LightWeight"}>
                        <h3>Light Weight</h3>
                        <p>
                            Light weights can either be glass cannons or untouchable speed demons.
                            It requires the most skill to play due to the lack of defenses and have to learn your match-up.
                        </p>
                        <p>
                            Weight range: &lt;75,000
                        </p>
                    </div>
                    <div className={"container-MidWeight"}>
                        <h3>Medium Weight</h3>
                        <p>
                            Medium weight is a good balance between good mobility and defenses.
                            Can take decent punishment and do just as much.
                        </p>
                        <p>
                            Weight range: 75,000 - 85,000
                        </p>
                    </div>
                    <div className={"container-HeavyWeight"}>
                        <h3>Heavy Weight</h3>
                        <p>
                            Heavy weights are the titans in the battlefield by having the highest defenses and fire power.
                            Just be aware that with all that armor and firepower, you're sacrificing a lot of mobility.
                        </p>
                        <p>
                            Weight range: 95,000+
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageFrameBuilder;
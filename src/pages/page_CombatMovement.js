import HoverPopUp from "../components/hover_Popup";
import React from "react";
import "./page_CombatMovement.css";

function CombatMovementPage(){
    const movement = [
        {
            video : "video/AB.mp4",
            title : "Assault Boost",
            description : "It allows you to rapidly move in the direction that the camera is facing which also applies to hard-lock since the camera is facing your target."
        },
        {
            video : "video/QB.mp4",
            title : "Quick Boost",
            description : "A quick directional dash that consumes energy but provides instant mobility and evasion capabilities."
        },
        {
            video : "video/Hover.mp4",
            title : "Hover",
            description : "Enhances Quick boosts and Negates stance weapons but consumes EN overtime"
        },
        {
            video : "video/Drift.mp4",
            title : "Tank Drift",
            description : "Change directions while on the Ground its not the best but saves on EN"
        }
    ]

    const combat = [
        {
            video : "video/Melee.mp4",
            title : "Melee Attacks",
            description : "Close-range high-damage attacks that require precise positioning but can stagger enemies quickly."
        },
        {
            video : "video/Range.mp4",
            title : "Ranged Weapons",
            description : "Various firearm options for sustained damage at different ranges."
        },
        {
            video : "video/Stagger.mp4",
            title : "Stagger System",
            description : "Building up enemy stagger meters to create openings for massive damage opportunities.Make sure you maintain yours or else they can turn the tide of battle."
        },
        {
            video : "video/Weapon Bay.mp4",
            title : "Weapon Bay Switching",
            description : "Quickly swapping between weapon sets to adapt to changing combat situations."
        },
        {
            video : "video/Lock On.mp4",
            title : "Target Lock",
            description : "Soft lock requires you to track your enemy manually but lock on times are faster. Hardlock allows you to manoeuvre better at the cost of some lock on time. "
        },
        {
            video : "video/Overheat.mp4",
            title : "Overheat",
            description : "This is mainly on energy weapons, you cant fire continuously or else it will be in cooldown "
        }
    ]

    return (
        <>
            <div className={"Movement-Video"}>
                <video autoPlay muted loop className="card-media">
                    <source src="video/Positioning.mp4" type="video/mp4"/>
                </video>
                <h2>
                    Positioning is the name of the game. Most builds don't have the resilience to withstand every attack. Master movement to control the battlefield.
                </h2>
            </div>
            <HoverPopUp
                category={movement}
                title="Movement Techniques"
            />
            <div className={"Combat-Video"}>
                <h2>
                    Aggressive positioning creates opportunities. Use your arsenal strategically to break enemy defenses and capitalize on openings.
                </h2>
                <video autoPlay muted loop className="card-media">
                    <source src="video/Combat.mp4" type="video/mp4"/>
                </video>
            </div>
            <HoverPopUp
                category={combat}
                title="Combat Systems"
            />
        </>
    )
}

export default CombatMovementPage;
import React from "react";
import HoverPopUp from "../components/hover_Popup";
import SlideShow from "../components/slideshow";
import "./page_Home.css"

function PageHome(){
    const slides_Games = [
        {
            video: "video/Elden Ring.mp4",
            title: "Elden Ring",
            description: "Won the Game of the Year Award in 2022"
        },
        {
            video: "video/Dark Souls 3.mp4",
            title: "Dark Souls",
            description: 'Titled the "Best RPG on PC" by Rock, Paper, Shotgun'
        },
        {
            video: "video/Sekiro.mp4",
            title: "Sekiro: Shadows Die Twice",
            description: "The Game Award for Game of the Year 2019 in the best audio design and best action/adventure game"
        }
    ];

    const card_StoryCombat = [
        {
            video : "video/Combat.mp4",
            title : "Combat",
            description : "Learn the Dance of Combat",
            navigate : "/CombatMovementPage"
        },
        {
            video : "video/Story.mp4",
            title : "Story",
            description : "Explore and Learn the events that occurred in Rubicon 3",
            navigate : "/StoryPage"
        }
    ]

    return (
        <>
            <div className={"main-Video"}>
                <video
                    src={process.env.PUBLIC_URL+"/"+"video/AC6_trailer.mp4"}
                    autoPlay
                    muted
                    loop
                />
                <div className={"video-title"}>
                    <h2>Armored Core 6</h2>
                    <h2>Fires of Rubicon</h2>
                </div>
            </div>

            <div className={"container-Slideshow"}>
                <SlideShow
                    slides_data={slides_Games}
                />
            </div>
            <div className={"container-Description"}>
                <h2>
                    Based on the knowledge gained during joint development of their recent titles, Bandai Namco
                    Entertainment and FromSoftware seek to deliver a new action game. By combining FromSoftware’s
                    longstanding expertise in mech games and their signature robust gameplay, ARMORED CORE VI FIRES OF
                    RUBICON will be a new action experience.
                </h2>
            </div>
            <div className={"container-InfoBoxes"}>
                <div>
                    <h1>Dynamic, Omni-directional Battles</h1>
                    <h2>Pilots will utilize their mech's, omni-directional movement, taking advantage of massive stages and their mech’s mobility</h2>
                </div>
                <video
                    src={process.env.PUBLIC_URL+"/"+"video/Positioning.mp4"}
                    autoPlay
                    muted
                    loop
                />
                <video
                    src={process.env.PUBLIC_URL+"/"+"video/Customize.mp4"}
                    autoPlay
                    muted
                    loop
                />
                <div>
                    <h1>Customize Your Mech to Your Playstyle</h1>
                    <h2>Customize Armored Core parts to suit a large variety of playstyles. Selecting different parts not only changes the mech’s attacks, but also directly affects its movement and battle style</h2>
                </div>
                <div>
                    <h1>Thrilling Boss Battles</h1>
                    <h2>Deploy a wide variety of offensive and defensive tactics at close and long range to take down powerful enemy bosses.</h2>
                </div>
                <video
                    src={process.env.PUBLIC_URL+"/"+"video/Bosses.mp4"}
                    autoPlay
                    muted
                    loop
                />
            </div>
            <HoverPopUp
                category={card_StoryCombat}
            />

        </>
    )
}

export default PageHome;
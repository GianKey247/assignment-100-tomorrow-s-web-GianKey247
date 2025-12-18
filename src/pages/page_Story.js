import React from "react";
import SlideShow from "../components/slideshow";
import HoverPopUp from "../components/hover_Popup";
import "./page_Story.css"

function PageStory(){
    const slides_Story = [
        {
            video: "video/Fires of Ibis.mp4",
            title: "The Fires of Ibis",
            description: "A catastrophic event that scorched Rubicon 3, leaving behind a world forever changed by Coral contamination."
        },
        {
            video: "video/Coral Discovery.mp4",
            title: "Coral Discovery",
            description: "The mysterious substance that both destroyed and now sustains Rubicon 3, coveted by corporations across the galaxy."
        },
        {
            video: "video/Mercenary Life.mp4",
            title: "Mercenary Life",
            description: "As an independent mercenary, your choices will determine the fate of Rubicon 3 and its warring factions."
        }
    ];

    const card_Factions = [
        {
            video: "video/Redguns.mp4",
            title: "Balam Industries",
            description: "A major corporation focused on heavy military hardware and brute force tactics. They seek to control Rubicon's resources through overwhelming firepower.",
        },
        {
            video: "video/Arquebus.mp4",
            title: "Arquebus Corporation",
            description: "Specialists in advanced technology and precision engineering. Their approach favors sophisticated systems and strategic superiority over raw power.",
        },
        {
            video: "video/RLF.mp4",
            title: "Rubicon Liberation Front",
            description: "Native resistance fighters determined to free Rubicon from corporate control. They use guerrilla tactics and intimate knowledge of the terrain.",
        },
        {
            video: "video/PCA.mp4",
            title: "Planetary Closure Administration",
            description: "The official governing body attempting to maintain order and contain the Coral threat, often through extreme measures and authoritarian control.",
        }
    ]

    return (
        <>
            <div className={"main-Video"}>
                <video
                    src={"video/Fires of Ibis.mp4"}
                    autoPlay
                    muted
                    loop
                />
                <div className={"video-title"}>
                    <h2>Repeat History</h2>
                    <h2>Or Change it?</h2>
                </div>
            </div>
            <div className={"container-MainDescription"}>
                <h2>
                    The Fires of Ibis scorched the World of Rubicon 3. <br/>
                    Half a century later, the world is stable once more but now corporations want to exploit the same resource that burned the world.
                </h2>
            </div>
            <div className={"container-StorySlides"} >
                <SlideShow
                    slides_data={slides_Story}
                />
            </div>
            <div className={"container-FactionTitle"}>
                <h2>Meet the Factions of Rubicon</h2>
            </div>
            <div>
                <HoverPopUp
                    category={card_Factions}
                    title="Warring Factions"
                />
            </div>
        </>
    )
}

export default PageStory;
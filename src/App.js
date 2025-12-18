import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CombatMovementPage from "./pages/page_CombatMovement";
import PageHome from "./pages/page_Home";
import PageStory from "./pages/page_Story";
import PageFrameBuilder from "./pages/page_FrameBuilder";
import CustomNavbar from "./components/navbar";

function App() {
    const [user, setUser] = useState({
        UserName: "",
        SavedBuilds: { "Flower": {} }
    });

    return (
        <div className="App">
            {/* ✅ Add basename for GitHub Pages subpath */}
            <Router basename={process.env.PUBLIC_URL}>
                <CustomNavbar user={user} setUser={setUser} />
                {/* ✅ Clean structure - no nested App/header */}
                <Routes>
                    <Route path="/" element={<PageHome />} />
                    <Route path="/CombatMovementPage" element={<CombatMovementPage />} />
                    <Route path="/StoryPage" element={<PageStory />} />
                    <Route path="/FrameBuilder" element={
                        <PageFrameBuilder user={user} setUser={setUser} />
                    } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
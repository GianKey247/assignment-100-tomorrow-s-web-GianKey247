import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import "./navbar.css"
import LoginModal from "../modals/loginModal";
import {useState} from "react";

function CustomNavbar({user, setUser}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark"className={"container-Navbar"}>
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} className={"hyper-Link"} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} className={"hyper-Link"} to="/CombatMovementPage">Movement and Combat</Nav.Link>
                        <Nav.Link as={NavLink} className={"hyper-Link"} to="/StoryPage">Story</Nav.Link>
                        <Nav.Link as={NavLink} className={"hyper-Link"} to="/FrameBuilder">Frame Builder</Nav.Link>
                        <button
                            onClick={()=> {
                                if (user.UserName){
                                    new Audio("./sfx/Logout.wav").play();
                                    setUser({UserName: "",
                                        SavedBuilds:{

                                        }});
                                }
                                else {setIsOpen(true)}
                            }}
                        >{user.UserName ? "Logout" : "Login" }</button>

                    </Nav>
                    <h2>Welcome : {user.UserName? user.UserName : "Guest"}</h2>
                </Container>
            </Navbar>
            <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} setUser={setUser}/>
        </>
    );
}
export default CustomNavbar;

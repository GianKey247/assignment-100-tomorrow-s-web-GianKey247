import PartTable from "./part_Table";
import "./full_Table.css";
import React, {useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function FullTable({selected_Parts,set_selected_Parts,user}){
    // Track which category is currently open as an object
    const [openCategory, setOpenCategory] = useState(null);
    return (
        <div className="full-table-container">
            <div>
                <DropdownButton id="dropdown-item-button"
                                title="Saved Builds Drop Down"
                >
                    {/*{!user&&<Dropdown.ItemText>If its empty, You have to sign in</Dropdown.ItemText>}*/}
                    {user && Object.entries(user.SavedBuilds).map(([buildName, parts]) => (
                        <Dropdown.Item
                            as="button"
                            key={buildName}
                            onClick={() => {
                                set_selected_Parts(parts);
                                // setOpenCategory(null);
                            }}
                        >
                            {buildName}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>

            <div className="full-table-item">
            <PartTable
                    openCategory={openCategory}
                    setOpenCategory={setOpenCategory}
                    title="Frame Parts"
                    categories={["head", "core", "arms", "legs"]}
                    selected_Parts={selected_Parts}
                    set_selected_Parts={set_selected_Parts}
                />
            </div>
            <div className="full-table-item">
                <PartTable
                    openCategory={openCategory}
                    setOpenCategory={setOpenCategory}
                    title="Weapon Units"
                    categories={["Left Arm", "Right Arm", "Left Back", "Right Back"]}
                    selected_Parts={selected_Parts}
                    set_selected_Parts={set_selected_Parts}
                />
            </div>
            <div className="full-table-item">
                <PartTable
                    openCategory={openCategory}
                    setOpenCategory={setOpenCategory}
                    title="Internals"
                    categories={["fcs", "generator", "booster", "expansion"]}
                    selected_Parts={selected_Parts}
                    set_selected_Parts={set_selected_Parts}
                />
            </div>
        </div>
    );
}

export default FullTable;
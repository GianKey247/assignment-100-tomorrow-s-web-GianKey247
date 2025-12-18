import PartSelector from "./part_Selector";
import PartSelectionModal from "../../modals/PartSelectionModal/PartSelectionModal";
import "./part_Table.css";


function PartTable({openCategory, setOpenCategory, title, categories, selected_Parts, set_selected_Parts}){
    // Create a function to update a specific category
    const setSelectedPartForCategory = (category, part) => {
        console.log(`PartTable - Setting part for ${category}:`, part);
        set_selected_Parts(prev => ({
            ...prev,
            [category.replace(" ", "")]: part ? { name: part } :{name: null}
        }));
        console.log(`PartTable - Updated selected parts:`, selected_Parts);
    };

    return (
        <div className="part-table">
            <h1 className="part-table__title">{title}</h1>
            <div className="part-table__grid">
                {categories.map(category => (
                    <PartSelector
                        key={category}
                        category={category}
                        openCategory={openCategory}
                        setOpenCategory={setOpenCategory}
                        selected_Parts={selected_Parts}
                    />
                ))}
            </div>

            {/* Render ONE modal for the currently open category */}
            {categories.map(category => {
                const isOpen = openCategory === category;
                console.log(`PartTable - Open category: ${category}, isOpen: ${isOpen}`);
                if (!isOpen) return null;

                // Determine the actual data category for the modal
                let dataCategory = category;
                let weaponPlacement = category;

                // If it's a weapon placement, the data category is "unit"
                if (["Right Arm", "Left Arm", "Right Back", "Left Back"].includes(category)) {
                    dataCategory = "unit";
                    weaponPlacement = category;
                }

                return (
                    <PartSelectionModal
                        key={category}
                        weapon_placement={weaponPlacement}
                        isOpen={isOpen}
                        setIsOpen={(isOpen) => {
                            if (!isOpen) {
                                setOpenCategory(null);
                            }
                        }}
                        category={dataCategory}
                        selected_Part={selected_Parts[category]}
                        setSelectedPart={(part) => setSelectedPartForCategory(category, part)}
                    />
                );
            })}
        </div>
    );
}

export default PartTable;
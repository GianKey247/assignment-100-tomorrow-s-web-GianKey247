import "./part_Selector.css";
import "../frame_Display.css"
import {getPartImage, hasNoPart} from "../../components/utils";

function PartSelector({openCategory, setOpenCategory, category, compact = false, selected_Parts}){
    const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1) || "Head";
    const dataCategory = category.replaceAll(" ", "");
    let part_image = getPartImage(dataCategory, selected_Parts[dataCategory])
    return (
        <div className={`category-container ${compact ? 'category-container--compact' : ''}`}>
            <h2>{categoryName}</h2>
            <input
                type="image"
                src={part_image}
                style={{opacity: hasNoPart(selected_Parts,category) ? 0.1 : 1}}
                alt={categoryName}
                onClick={() => {
                    console.log("PartSelector clicked - setting openCategory to:", category);
                    setOpenCategory(category); // Use the original category, not dataCategory
                } }
            />
        </div>
    );
}
export default PartSelector;
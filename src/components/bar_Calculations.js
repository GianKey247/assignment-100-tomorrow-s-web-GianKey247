import {partData} from "./part_Data";

function BarCalculations(category){
    let ignore_stats = [
        'RightArm',
        'LeftArm',
        'RightBack',
        'LeftBack',
        'IsEnergyFirearmSpec',
        'IsMeleeSpec',
        "DefaultOrdering",
        "Image",
        "Kind",
        "Manufacturer",
        "Name",
        "Description",
        "AttackType",
        "WeaponType",
        "ReloadType",
        "AdditionalEffect",
    ]

    const highest_values_stats = {};
    const lowest_values_stats = {};
    const average_values_stats = {};

// Assuming ignore_stats is defined as an array or Set
// const ignore_stats = new Set(['stat1', 'stat2']); // Example
    const selected_Category_Data = partData[category];

    for (const [part, stats] of Object.entries(selected_Category_Data)) {
        for (const [stat, value] of Object.entries(stats)) {
            if (ignore_stats.includes(stat)) continue; // or ignore_stats.has(stat) if using Set

            if (!(stat in highest_values_stats)) {
                highest_values_stats[stat] = value;
                lowest_values_stats[stat] = value;
                average_values_stats[stat] = value;
            } else {
                if (value > highest_values_stats[stat]) {
                    highest_values_stats[stat] = value;
                }
                if (value < lowest_values_stats[stat]) {
                    lowest_values_stats[stat] = value;
                }
                average_values_stats[stat] += value;
            }
        }
    }
    console.log(highest_values_stats)
    console.log(lowest_values_stats)
    return {
        highest_values_stats : highest_values_stats,
        lowest_values_stats : lowest_values_stats,
    }

}
export default BarCalculations;
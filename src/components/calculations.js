import {partData} from "./part_Data";

export function Calculations(selected_Parts) {
    let totalAP = 0;
    let totalENLoad = 0;
    let ENOutput = 0;
    let totalENCapacity = 0;
    let totalWeight = 0;
    let attitude_Recovery = 0;
    let target_Tracking = 0;
    let legWeight = 0;
    let totalLoad = 0;
    let loadLimit = 0;
    let totalArmsLoad = 0;
    let armsLoadLimit = 0;
    let totalAttitudeStability = 0;
    let totalAttitudeRecovery = 0;
    let totalAntiKineticDefense = 0;
    let totalAntiEnergyDefense = 0;
    let totalAntiExplosiveDefense = 0;
    let firearmSpec = 0;
    let speed = 0;
    let qb_Speed = 0;
    let qb_ReloadMult = 0;
    let QBReloadTime = 0;
    let base_QBENConsumption = 0;
    let QBENConsumption = 0;
    let QBThrust = 0;
    let generatorOutputAdj = 0;
    let generatorSupplyAdjustment = 0;
    let boosterEfficiencyAdj = 0;
    let boosterIdealWeight = 0;
    let en_SupplyEfficiency = 0;
    let en_RechargeDel = 0;
    let ENRecharge = 0;
    const selected_Category = Object.keys(selected_Parts);
    let selected_Parts_stats = [];
    let part_name;
    for (let category of selected_Category){
        part_name=selected_Parts[category]["name"]
        if (part_name=== null){
            continue
        }
        if (category === "LeftArm" || category === "RightArm"){
            selected_Parts_stats.push(partData["unit"][part_name])
            totalArmsLoad += partData["unit"][part_name]["Weight"]
        }
        else if ( category === "LeftBack" || category === "RightBack"){
            selected_Parts_stats.push(partData["unit"][part_name])
        }
        else if (category === "legs"){
            legWeight = partData[category][part_name]["Weight"]
            selected_Parts_stats.push(partData[category][part_name])
        }
        else {
            selected_Parts_stats.push(partData[category][part_name])
        }
    }
    selected_Parts_stats.forEach(part => {
        totalAP += part.AP || 0;
        totalAttitudeStability += part.AttitudeStability || 0;
        totalAntiKineticDefense += part.AntiKineticDefense || 0;
        totalAntiEnergyDefense += part.AntiEnergyDefense || 0;
        totalAntiExplosiveDefense += part.AntiExplosiveDefense || 0;
        totalAttitudeRecovery += part.AttitudeRecovery || 0;
        armsLoadLimit += part.ArmsLoadLimit || 0;
        firearmSpec += part.FirearmSpecialization || 0;
        loadLimit += part.LoadLimit || 0;
        totalWeight += part.Weight || 0;
        generatorOutputAdj += part.GeneratorOutputAdj || 0;
        generatorSupplyAdjustment += part.GeneratorSupplyAdj || 0;
        boosterEfficiencyAdj += part.BoosterEfficiencyAdj || 0;
        boosterIdealWeight += part.QBReloadIdealWeight || 0;
        totalENLoad += part.ENLoad || 0;
        ENOutput += part.ENOutput || 0;
        ENRecharge += part.ENRecharge || 0;
        totalENCapacity += part.ENCapacity || 0;
        base_QBENConsumption += part.QBENConsumption || 0;
        QBReloadTime += part.QBReloadTime || 0;
        // speed += part.Speed || 0;
        QBThrust += part.QBThrust || 0;
    })

    // ------ EN Calculatons ------
    // --- EN OutPut ---
    let totalENOutput = 0
    totalENOutput = (ENOutput*(generatorOutputAdj/100)).toFixed(0)

    // --- EN Supply Efficiency ---
    let en_Diff = totalENOutput - totalENLoad
    console.log("Calculations en_Diff", en_Diff)
    if (en_Diff < 0) {
        en_SupplyEfficiency = 100
    }
    else if (en_Diff>=0 && en_Diff <= 1800){
        en_SupplyEfficiency = 4.1667 * en_Diff + 1500
    }
    else if (en_Diff>=1800 && en_Diff <= 3500){
        en_SupplyEfficiency = 4.4118 * en_Diff + 1058.8235
    }
    else{
        en_SupplyEfficiency = 16500
    }

    // --- EN Recharge Delay ---
    en_RechargeDel = (1000 / ENRecharge * (2 - generatorSupplyAdjustment/100)).toFixed(2)

    // ------ QB Calcualations ------
    // --- QB Speed ---
    let qb_SpeedMultiplier = 0
    if (totalWeight <= 40000){
        qb_SpeedMultiplier = 1
    }
    if (totalWeight <= 62500){
        qb_SpeedMultiplier = 1.1778 - 0.0444 * totalWeight / 10000
    }
    if (totalWeight <= 75000){
        qb_SpeedMultiplier = 1.15 - 0.04 * totalWeight / 10000
    }
    if (totalWeight <= 80000){
        qb_SpeedMultiplier = 1.6 - 0.1 * totalWeight / 10000
    }
    if (totalWeight <= 120000){
        qb_SpeedMultiplier = 1 - 0.025 * totalWeight / 10000
    }
    else {
        qb_SpeedMultiplier = 0.7
    }
    qb_Speed = ((QBThrust/50)*qb_SpeedMultiplier).toFixed(0)

    // --- QB Reload Time ---
    let booster_WeightDiff = (totalWeight - boosterIdealWeight)/ 10000
    if (booster_WeightDiff <= 0) {
        qb_ReloadMult = 1
    }
    if (booster_WeightDiff <= 0.5){
        qb_ReloadMult = 0.2 * booster_WeightDiff + 1
    }
    if (booster_WeightDiff <= 1){
        qb_ReloadMult = 0.4 * booster_WeightDiff + 0.9
    }
    if (booster_WeightDiff <= 3){
        qb_ReloadMult = 0.85 * booster_WeightDiff + 0.45
    }
    if (booster_WeightDiff <= 5){
        qb_ReloadMult = 0.25 * booster_WeightDiff + 2.25
    }
    else{
        qb_ReloadMult = 3.5
    }
    QBReloadTime = (QBReloadTime*qb_ReloadMult).toFixed(2)

    // --- QB ENconsumption ---
    QBENConsumption = (base_QBENConsumption * (2 - boosterEfficiencyAdj/100)).toFixed(0)

    // ------ Miscellaneous Calculations ------
    // --- Attitude Recovery ---
    let attitude_RecMult = 0
    if  (!totalWeight) {
        attitude_RecMult = 0
    }
    if (totalWeight <= 40000){
        attitude_RecMult = 1.5
    }
    if (totalWeight <= 60000){
        attitude_RecMult = 1.5 - 0.3 * ((totalWeight - 40000) / 20000)
    }
    if (totalWeight <= 80000){
        attitude_RecMult = 1.2 - 0.3 * ((totalWeight - 60000) / 20000)
    }
    if (totalWeight <= 110000){
        attitude_RecMult = 0.9 - 0.3 * ((totalWeight - 80000) / 30000)
    }
    if (totalWeight <= 140000){
        attitude_RecMult = 0.6 - 0.03 * ((totalWeight - 110000) / 30000)
    }
    else{
        attitude_RecMult = 0.57
    }
    attitude_Recovery = Math.round(100 * attitude_RecMult)

    // --- Target Tracking ---
    const mapping = [
        {"firearmSpec": 26, "targetTracking": 41},
        {"firearmSpec": 45, "targetTracking": 72},
        {"firearmSpec": 53, "targetTracking": 80},
        {"firearmSpec": 80, "targetTracking": 86},
        {"firearmSpec": 88, "targetTracking": 87},
        {"firearmSpec": 92, "targetTracking": 88},
        {"firearmSpec": 95, "targetTracking": 89},
        {"firearmSpec": 96, "targetTracking": 89},
        {"firearmSpec": 100, "targetTracking": 90},
        {"firearmSpec": 102, "targetTracking": 90},
        {"firearmSpec": 103, "targetTracking": 90},
        {"firearmSpec": 104, "targetTracking": 90},
        {"firearmSpec": 122, "targetTracking": 94},
        {"firearmSpec": 123, "targetTracking": 94},
        {"firearmSpec": 128, "targetTracking": 95},
        {"firearmSpec": 133, "targetTracking": 96},
        {"firearmSpec": 136, "targetTracking": 97},
        {"firearmSpec": 160, "targetTracking": 104}
    ]

    for (let tracking in mapping){
        if (firearmSpec === mapping[tracking]['firearmSpec']){
            target_Tracking = mapping[tracking]['targetTracking']
            console.log("Calculations targetTracking", target_Tracking)
            break
        }
    }

    // --- leg Weight ---
    totalLoad = (totalWeight-legWeight)


    return{
        AP: totalAP,
        attitudeStability: totalAttitudeStability,
        attitudeRecovery: attitude_Recovery,
        targetTracking : target_Tracking,
        antiKineticDefense: totalAntiKineticDefense,
        antiEnergyDefense: totalAntiEnergyDefense,
        antiExplosiveDefense: totalAntiExplosiveDefense,
        armLoad : totalArmsLoad,
        armsLoadLimit: armsLoadLimit,
        totalLoad : totalLoad,
        loadLimit : loadLimit,
        weight: totalWeight,
        enSupplyEfficiency : en_SupplyEfficiency.toFixed(0),
        enRechargeDelay: en_RechargeDel,
        // generatorOutputAdj: generatorOutputAdj,
        // generatorSupplyAdjustment: generatorSupplyAdjustment,
        // boosterEfficiencyAdj: boosterEfficiencyAdj,
        // boosterIdealWeight: boosterIdealWeight,
        ENLoad: totalENLoad,
        ENOutput: totalENOutput,
        // ENRecharge: ENRecharge,
        ENCapacity: totalENCapacity,
        boostSpeed: 0,
        QBSpeed: qb_Speed,
        QBENConsumption: QBENConsumption,
        QBReloadTime: QBReloadTime,

    }
}
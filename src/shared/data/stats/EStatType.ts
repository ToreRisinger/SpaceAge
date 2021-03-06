export enum EStatType {
    /*
        Secondary stats (calculated from the other stats)
    */
    acceleration,
    max_speed,
    dodge, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %


    /*
        Primary stats (Can be affected by ship modules and skills)
    */
    thrust,
    mass,
    power,

    cargo_hold_size,

    hull,
    armor,
    shield, 
    shield_generation,

    radar_range,
    weapon_range,
    mining_laser_range,
    mining_laser_yield,
    weapon_damage,

    target_dodge_reduction, // calculating %: log((stat/(radar_range/<some_low_value_to_reduce_radar_range_impact>)+1)), gives value between 0->1 which is the %
    radar_signature_reduction, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %

    hull_repair_cost,
    armor_repair_cost,
    hull_repair_speed,
    armor_repair_speed,

    ore_processing_speed, // m2 per secondn, modified by refinary module
    manufactoring_speed, // % increase, modified by factory module

    refining_skill, // unlocks rarer minerals
    manufactoring_skill, // unlocks rarer quality items

    /*
        Skill stats (affected by skills only)
    */
    max_nr_of_modules, 

    main_module_quality,
    thrust_module_quality,
    power_module_quality,
    cargo_hold_module_quality,
    armor_module_quality,
    shield_module_quality,
    shield_generation_module_quality,
    radar_range_module_quality,
    weapon_range_module_quality,
    mining_laser_module_quality,
    turret_module_quality,
    refinary_module_quality,
    factory_module_quality,
    target_dodge_reduction_module_quality,
    radar_signature_reduction_module_quality,
    support_module_quality
}
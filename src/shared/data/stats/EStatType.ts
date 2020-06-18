export enum EStatType {
    acceleration,
    max_speed,
    thrust,
    mass,
    power,
    hull,
    armor,
    shield, 
    radar_range,
    shield_generation,
    armor_impact_resistance, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
    armor_heat_resistance, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
    armor_explosion_resistance, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
    target_dodge_reduction, // calculating %: log((stat/(radar_range/<some_low_value_to_reduce_radar_range_impact>)+1)), gives value between 0->1 which is the %
    cargo_hold,
    dodge, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
    radar_signature_reduction, // calculating %: log((stat/(weight/<some_low_value_to_reduce_weight_impact>)+1)), gives value between 0->1 which is the %
    weapon_range,
    explosive_dps,
    impact_dps,
    heat_dps,
    normal_dps,
    mining_laser_strength,
    mining_laser_range,
    max_nr_of_modules
}
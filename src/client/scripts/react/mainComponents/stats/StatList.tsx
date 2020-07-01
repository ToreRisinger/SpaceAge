import React, { Fragment } from "react";
import { CCharacter } from "../../../game_objects/CCharacter";
import { EStatType } from "../../../../../shared/data/stats/EStatType";
import { IModuleStat } from "../../../../../shared/data/item/IModuleStat";
import { StatInfo } from "../../../../../shared/data/stats/StatInfo";

export interface StatListProps { character: CCharacter, highLightStats: Array<IModuleStat> }

export default class StatList extends React.Component<StatListProps, {}> {

    constructor(props : StatListProps) {
        super(props)
        this.getHighLightText = this.getHighLightText.bind(this);
        this.getStatString = this.getStatString.bind(this);
    }

    render() {
        let char = this.props.character;
        let statMap: Map<EStatType, IModuleStat> = new Map();
        this.props.highLightStats.forEach(stat => {
            statMap.set(stat.property, stat);
        })

        return (
            <div className="StatList">
                <div className="StatListContainer">
                    <pre>Thrust:                      {this.getStatString(char, EStatType.thrust, statMap)}</pre>
                    <pre>Acceleration:                {this.getStatString(char, EStatType.acceleration, statMap)}</pre>
                    <pre>Max speed:                   {char.getStat(EStatType.max_speed)} m/s {this.getHighLightText(char.getStat(EStatType.max_speed), EStatType.max_speed, statMap)}</pre>
                    <pre>Mass:                        {char.getStat(EStatType.mass)} kg {this.getHighLightText(char.getStat(EStatType.mass), EStatType.mass, statMap)}</pre>
                    
                    <hr></hr>
                    <pre>Power:                       {char.getStat(EStatType.power)} {this.getHighLightText(char.getStat(EStatType.power), EStatType.power, statMap)}</pre>
                    
                    <hr></hr>
                    <pre>Shield:                      {char.getStat(EStatType.shield)} {this.getHighLightText(char.getStat(EStatType.shield), EStatType.shield, statMap)}</pre>
                    <pre>Shield generation:           {char.getStat(EStatType.shield_generation)} p/s {this.getHighLightText(char.getStat(EStatType.shield_generation), EStatType.shield_generation, statMap)}</pre>
                    <pre>Armor:                       {char.getStat(EStatType.armor)} {this.getHighLightText(char.getStat(EStatType.armor), EStatType.armor, statMap)}</pre>
                    <pre>Hull:                        {char.getStat(EStatType.hull)} {this.getHighLightText(char.getStat(EStatType.hull), EStatType.hull, statMap)}</pre>

                    <hr></hr>
                    <pre>Radar range:                 {char.getStat(EStatType.radar_range)} m {this.getHighLightText(char.getStat(EStatType.radar_range), EStatType.radar_range, statMap)}</pre>
                    <pre>Radar signature reduction:   {char.getStat(EStatType.radar_signature_reduction)} {this.getHighLightText(char.getStat(EStatType.radar_signature_reduction), EStatType.radar_signature_reduction, statMap)}</pre>
                    
                    <hr></hr>
                    <pre>Dodge:                       {Math.round(char.getStat(EStatType.dodge) * 100)} % {this.getHighLightText(char.getStat(EStatType.dodge), EStatType.dodge, statMap)}</pre>
                    <pre>Target dodge reduction:      {char.getStat(EStatType.target_dodge_reduction)} {this.getHighLightText(char.getStat(EStatType.target_dodge_reduction), EStatType.target_dodge_reduction, statMap)}</pre>

                    <hr></hr>
                    <pre>Cargo hold:                  {char.getStat(EStatType.cargo_hold)} m<sup>2</sup> {this.getHighLightText(char.getStat(EStatType.cargo_hold), EStatType.cargo_hold, statMap)}</pre>
                    
                    <hr></hr>
                    <pre>Weapon range:                {char.getStat(EStatType.weapon_range)} m {this.getHighLightText(char.getStat(EStatType.weapon_range), EStatType.weapon_range, statMap)}</pre>
                    <pre>Weapon damage:               {char.getStat(EStatType.weapon_damage)} damage per second {this.getHighLightText(char.getStat(EStatType.weapon_damage), EStatType.weapon_damage, statMap)}</pre>

                    <hr></hr>
                    <pre>Mining laser strength:       {char.getStat(EStatType.mining_laser_strength)} {this.getHighLightText(char.getStat(EStatType.mining_laser_strength), EStatType.mining_laser_strength, statMap)}</pre>
                    <pre>Mining laser range:          {char.getStat(EStatType.mining_laser_range)} m {this.getHighLightText(char.getStat(EStatType.mining_laser_range), EStatType.mining_laser_range, statMap)}</pre>    
                </div>
            </div>
        );
    }

    private getStatString(character: CCharacter, stat: EStatType, statMap: Map<EStatType, IModuleStat>) {
        let statValue = Math.round(character.getStat(stat));
        return (
            <Fragment>
                {statValue} <span dangerouslySetInnerHTML={{__html: StatInfo.statTypeUnitToString(stat)}}></span> {this.getHighLightText(statValue, stat, statMap)}
            </Fragment>
        )
        
    }

    private getHighLightText(baseValue: number, stat: EStatType, statMap: Map<EStatType, IModuleStat>) {
        let moduleStat = statMap.get(stat);
        if(moduleStat != undefined) {
            let addedValue = StatInfo.getAddedValue(baseValue, moduleStat.modifier, moduleStat.value);
            let color = StatInfo.statModifierColor(moduleStat.modifier);
            let modifier = StatInfo.statModifierToString(moduleStat.modifier);
            return (
                <Fragment>
                    <span style={{color: color}}> {modifier + addedValue}</span>
                </Fragment>
            )
        } else {
            return <Fragment></Fragment>
        }
    }
}
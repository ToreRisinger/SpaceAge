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
                    <pre>Max speed:                   {this.getStatString(char, EStatType.max_speed, statMap)}</pre>
                    <pre>Mass:                        {this.getStatString(char, EStatType.mass, statMap)}</pre>
                    
                    <hr></hr>
                    <pre>Power:                       {this.getStatString(char, EStatType.power, statMap)}</pre>
                    
                    <hr></hr>
                    <pre>Shield:                      {this.getStatString(char, EStatType.shield, statMap)}</pre>
                    <pre>Shield generation:           {this.getStatString(char, EStatType.shield_generation, statMap)}</pre>
                    <pre>Armor:                       {this.getStatString(char, EStatType.armor, statMap)}</pre>
                    <pre>Hull:                        {this.getStatString(char, EStatType.hull, statMap)}</pre>

                    <hr></hr>
                    <pre>Radar range:                 {this.getStatString(char, EStatType.radar_range, statMap)}</pre>
                    <pre>Radar signature reduction:   {this.getStatString(char, EStatType.radar_signature_reduction, statMap)}</pre>
                    
                    <hr></hr>
                    <pre>Dodge:                       {this.getStatString(char, EStatType.dodge, statMap)}</pre>
                    <pre>Target dodge reduction:      {this.getStatString(char, EStatType.target_dodge_reduction, statMap)}</pre>

                    <hr></hr>
                    <pre>Cargo hold:                  {this.getStatString(char, EStatType.cargo_hold_size, statMap)}</pre>
                    <pre>Cargo slots:            {this.getStatString(char, EStatType.cargo_slots, statMap)}</pre>

                    <hr></hr>
                    <pre>Weapon range:                {this.getStatString(char, EStatType.weapon_range, statMap)}</pre>
                    <pre>Weapon damage:               {this.getStatString(char, EStatType.weapon_damage, statMap)}</pre>

                    <hr></hr>
                    <pre>Mining laser yield:          {this.getStatString(char, EStatType.mining_laser_yield, statMap)}</pre>
                    <pre>Mining laser range:          {this.getStatString(char, EStatType.mining_laser_range, statMap)}</pre>    
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
import { ENpcType } from "./ENpcType";
import { EMineralItemType } from "../item/EMineralItemType";

export module NpcInfo {

    export interface IBounty {
        bountyMin: number,
        bountyMax: number
    }

    export interface IPossibleLoot {
        quantityMin: number,
        quantityMax: number,
        itemType: EMineralItemType
    }

    export interface ILoot {
        numberOfLootMin: number,
        numberOfLootMax: number,
        possibleLootList: Array<IPossibleLoot>
    }
    
    export interface INpcInfo {
        name: string,
        bounty: IBounty,
        loot: ILoot
    }


    const NpcTypeToNpcInfoMap : { [key: number]: INpcInfo } = {
        [ENpcType.SMUGGLER] : {  
            name: "Smuggler",
            bounty: {
                bountyMin: 5,
                bountyMax: 10
            },
            loot: {
                numberOfLootMin: 1,
                numberOfLootMax: 2,
                possibleLootList: [
                    {
                        itemType: EMineralItemType.IRON_ORE,
                        quantityMin: 3,
                        quantityMax: 5
                    },
                    {
                        itemType: EMineralItemType.GOLD_ORE,
                        quantityMin: 1,
                        quantityMax: 2
                    }
                ]
            }
        },
        [ENpcType.PIRATE] : {  
            name: "Pirate",
            bounty: {
                bountyMin: 7,
                bountyMax: 12
            },
            loot: {
                numberOfLootMin: 1,
                numberOfLootMax: 2,
                possibleLootList: [
                    {
                        itemType: EMineralItemType.DIAMOND_ORE,
                        quantityMin: 3,
                        quantityMax: 5
                    },
                    {
                        itemType: EMineralItemType.TITANIUM_ORE,
                        quantityMin: 1,
                        quantityMax: 2
                    }
                ]
            }
        },
        [ENpcType.TRADER] : {  
            name: "Trader",
            bounty: {
                bountyMin: 2,
                bountyMax: 5
            },
            loot: {
                numberOfLootMin: 1,
                numberOfLootMax: 2,
                possibleLootList: [
                    {
                        itemType: EMineralItemType.GOLD_ORE,
                        quantityMin: 3,
                        quantityMax: 5
                    },
                    {
                        itemType: EMineralItemType.URANIUM_ORE,
                        quantityMin: 1,
                        quantityMax: 2
                    }
                ]
            }
        }
    }

    export function getNpcInfo(type : ENpcType) : INpcInfo {
        return NpcTypeToNpcInfoMap[type];
    }
}
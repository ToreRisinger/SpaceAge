import { SPRITES } from "./SPRITES"

interface IShipModule {
    sprite : string,
    animation : string,
    cargo : number,
    weight : number,
    hull : number,
    power : number,
    thrust : number
}

export var OK : IShipModule = {
    sprite : SPRITES.MAIN_MODULE_I_COMMON_SPRITE.key,
    animation : SPRITES.MAIN_MODULE_I_COMMON_SPRITE.anims.ANIM_1.key,
    cargo : 1,
    weight : 20,
    hull : 20,
    power : 10,
    thrust : 10
}
export const SHIP_MODULES = {
    MAIN_MODULE_I_COMMON : {
        sprite : SPRITES.MAIN_MODULE_I_COMMON_SPRITE.key,
        animation : SPRITES.MAIN_MODULE_I_COMMON_SPRITE.anims.ANIM_1.key,
        cargo : 1,
        weight : 20,
        hull : 20,
        power : 10,
        thrust : 10
    }
     
}
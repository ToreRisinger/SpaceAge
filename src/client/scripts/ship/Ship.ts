import { SHIP_MODULES } from "./SHIP_MODULES"

export class Ship {

    private x : number;
    private y : number;
    private shipModules : Object;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.shipModules = SHIP_MODULES.MAIN_MODULE_I_COMMON;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x : number) {
        this.x = x;
    }

    setY(y : number) {
        this.y = y;
    }

}
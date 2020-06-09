import { ShipModule } from "./ShipModule";
import { Ship } from "./Ship";

export class ShipModuleWrapper {

    private modules: Array<ShipModule>;

    constructor(ship: Ship, thisPlayerShip: boolean) {
        this.modules = new Array();
        ship.getData().modules.forEach(_module => {
            this.modules.push(new ShipModule(ship, _module, thisPlayerShip));
        })
    }

    public update() {
        this.modules.forEach(_module => {
            _module.update();
        })
    }

    public setVisible(value : boolean) : void {
        this.modules.forEach(_module => {
            _module.setVisible(value);
        })
    }

    public destroy() {
        this.modules.forEach(_module => {
            _module.destroy();
        })
    }
}
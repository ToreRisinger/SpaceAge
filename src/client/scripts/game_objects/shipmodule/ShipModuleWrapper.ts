import { ShipModule } from "./ShipModule";
import { Ship } from "../Ship";
import { MiningLaserShipModule } from "./MiningLaserShipModule";
import { WeaponShipModule } from "./WeaponShipModule";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";

export class ShipModuleWrapper {

    private modules: Array<ShipModule>;

    constructor(ship: Ship, thisPlayerShip: boolean) {
        this.modules = new Array();
        ship.getModules().forEach(_module => {
            if(_module.moduleItem.itemType == EModuleItemType.MINING_LASER_MODULE) {
                this.modules.push(new MiningLaserShipModule(ship, _module, thisPlayerShip));
            } else if(_module.moduleItem.itemType == EModuleItemType.LASER_MODULE
                || _module.moduleItem.itemType == EModuleItemType.TURRET_MODULE
                || _module.moduleItem.itemType == EModuleItemType.RAIL_GUN_MODULE
                || _module.moduleItem.itemType == EModuleItemType.MISSLE_MODULE){
                this.modules.push(new WeaponShipModule(ship, _module, thisPlayerShip));
            } else {
                this.modules.push(new ShipModule(ship, _module, thisPlayerShip));
            }
        });
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
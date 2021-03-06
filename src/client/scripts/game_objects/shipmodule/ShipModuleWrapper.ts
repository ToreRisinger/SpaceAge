import { ShipModule } from "./ShipModule";
import { MiningLaserShipModule } from "./MiningLaserShipModule";
import { WeaponShipModule } from "./WeaponShipModule";
import { EModuleItemType } from "../../../../shared/data/item/EModuleItemType";
import { CShip } from "../CShip";

export class ShipModuleWrapper {

    private modules: Array<ShipModule>;

    constructor(ship: CShip, thisPlayerShip: boolean) {
        this.modules = new Array();
        ship.getModules().forEach(_module => {
            if(_module.moduleItem.itemType == EModuleItemType.MINING_RANGE_MODULE) {
                this.modules.push(new MiningLaserShipModule(ship, _module, thisPlayerShip));
            } else if(_module.moduleItem.itemType == EModuleItemType.TURRET_MODULE) {
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
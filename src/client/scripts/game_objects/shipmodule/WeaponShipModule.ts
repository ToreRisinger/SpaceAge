import { ShipModule } from "./ShipModule";
import { GameObject } from "../GameObject";
import { GameObjectHandler } from "../../modules/GameObjectHandler";
import { Utils } from "../../../../shared/util/Utils";
import { Graphics } from "../../modules/graphics/Graphics";
import { IShipModuleInstance } from "../../../../shared/data/shipmodule/IShipModuleInstance";
import { EStatType } from "../../../../shared/data/stats/EStatType";
import { CShip } from "../CShip";
import { DRAW_LAYERS } from "../../constants/DRAW_LAYERS";

export class WeaponShipModule extends ShipModule {

    private bulletEmitter: Graphics.ParticleEmitter;
    private weaponParticleRandomizer: number;
    private weaponParticleRandomizerTimer: number;
    private weaponParticleRandomizerDirection: boolean;

    constructor(ship: CShip, _module: IShipModuleInstance, thisPlayerShip: boolean) {
        super(ship, _module, thisPlayerShip);
        //@ts-ignore
        this.bulletEmitter = new Graphics.ParticleEmitter({
            x: 0,
            y: 0,
            lifespan: 300, //TODO change so this depend on distance between ships
            speed: { min: 1000, max: 1200 },
            angle: 330,
            gravityY: 0,
            scale: { start: 2, end: 0.5},
            quantity: 1,
            frequency: 50
        }, Graphics.EParticleManagerType.SMALL_BULLET, DRAW_LAYERS.GRAPHICS_LAYER);
        this.weaponParticleRandomizer = 0;
        this.weaponParticleRandomizerTimer = 0;
        this.weaponParticleRandomizerDirection = true;
        this.bulletEmitter.stop();
        this.bulletEmitter.follow(this.getSprite());
    }


    public update() {
        super.update();
        this.updateBulletParticles();
    }

    private updateBulletParticles() {
        this.bulletEmitter.stop();
        let ship : CShip = this.getShip();
        let targetObject: GameObject | undefined = GameObjectHandler.getGameObjectsMap().get(ship.getTargetId());
        if(ship.isAttacking() && targetObject != undefined && this.targetInRange(targetObject, ship)) {
            if(this.weaponParticleRandomizerTimer <= 0) {
                this.weaponParticleRandomizerTimer = Utils.getRandomNumber(50, 100);
                let randomNumber = Utils.getRandomNumber(0, 15);
                if(this.weaponParticleRandomizerDirection) {
                    randomNumber = -randomNumber;
                }
                this.weaponParticleRandomizer = Utils.ANGLE_TO_DEGREE + randomNumber;
                this.weaponParticleRandomizerDirection = !this.weaponParticleRandomizerDirection;
            }
            this.weaponParticleRandomizerTimer -= 1;
            let targetPos = targetObject.getPos();
            let angle = Phaser.Math.Angle.Between(this.getCalculatedModuleX(), this.getCalculatedModuleY(), targetPos.x, targetPos.y)
            this.bulletEmitter.setAngle(angle * this.weaponParticleRandomizer);
            this.bulletEmitter.start();
        }
    }

    private targetInRange(target : GameObject, ship : CShip): boolean {
        let range = ship.getStat(EStatType.weapon_range);
        let targetPos = target.getPos();
        let shipPos = ship.getPos();
        return targetPos.subtract(shipPos).length() <= range;
    }

    public setVisible(value: boolean): void {
        this.bulletEmitter.setVisible(value);
        super.setVisible(value);
    }

    public destroy() {
        this.bulletEmitter.destroy();
        super.destroy();
    }
}
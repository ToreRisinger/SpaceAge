import { ShipModule } from "./ShipModule";
import { Ship } from "../Ship";
import { GameObject } from "../GameObject";
import { ICharacter } from "../../../../shared/data/gameobject/ICharacter";
import { GameScene, EParticleManagerType } from "../../scenes/GameScene";
import { GameObjectHandler } from "../../modules/GameObjectHandler";
import { Utils } from "../../../../shared/util/Utils";
import { Graphics } from "../../modules/graphics/Graphics";
import { IShipModuleInstance } from "../../../../shared/data/IShipModuleInstance";
import { EStatType } from "../../../../shared/data/stats/EStatType";

export class WeaponShipModule extends ShipModule {

    private bulletEmitter: Graphics.ParticleEmitter;
    private weaponParticleRandomizer: number;
    private weaponParticleRandomizerTimer: number;
    private weaponParticleRandomizerDirection: boolean;

    constructor(ship: Ship, _module: IShipModuleInstance, thisPlayerShip: boolean) {
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
        }, EParticleManagerType.SMALL_BULLET);
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
        let ship : Ship = this.getShip();
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

    private targetInRange(target : GameObject, ship : Ship): boolean {
        let range = ship.getStat(EStatType.weapon_range);
        let targetPos = target.getPos();
        let shipPos = ship.getPos();
        return targetPos.subtract(shipPos).length() <= range;
    }
}
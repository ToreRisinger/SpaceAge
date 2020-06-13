import { ShipModule } from "./ShipModule";
import { Ship } from "../Ship";
import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";
import { GameObject } from "../GameObject";
import { ICharacter } from "../../../../shared/interfaces/ICharacter";
import { Stats } from "../../../../shared/stats/Stats";
import { GameScene, EParticleManagerType } from "../../scenes/GameScene";
import { GameObjectHandler } from "../../modules/GameObjectHandler";
import { Utils } from "../../../../shared/scripts/Utils";
import { Graphics } from "../../modules/graphics/Graphics";

export class WeaponShipModule extends ShipModule {

    private bulletEmitter: Graphics.ParticleEmitter;
    private weaponParticleRandomizer: number;
    private weaponParticleRandomizerTimer: number;
    private weaponParticleRandomizerDirection: boolean;

    constructor(ship: Ship, _module: ObjectInterfaces.IShipModuleInstance, thisPlayerShip: boolean) {
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
        let shipData : ICharacter = this.getShip().getData();
        let targetObject: GameObject | undefined = GameObjectHandler.getGameObjectsMap().get(shipData.state.targetId);
        if(shipData.state.isAttacking && targetObject != undefined && this.targetInRange(targetObject, shipData)) {
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
            let angle = Phaser.Math.Angle.Between(this.getCalculatedModuleX(), this.getCalculatedModuleY(), targetObject.getGameObjectData().x, targetObject.getGameObjectData().y)
            this.bulletEmitter.setAngle(angle * this.weaponParticleRandomizer);
            this.bulletEmitter.start();
        }
    }

    private targetInRange(target : GameObject, shipData : ICharacter): boolean {
        let range = shipData.stats[Stats.EStatType.weapon_range];
        let targetPos = new Phaser.Math.Vector2(target.getGameObjectData().x, target.getGameObjectData().y);
        let shipPos = new Phaser.Math.Vector2(shipData.x, shipData.y);
        return targetPos.subtract(shipPos).length() <= range;
    }
}
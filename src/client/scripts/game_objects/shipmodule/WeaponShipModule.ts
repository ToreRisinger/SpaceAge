import { ShipModule } from "./ShipModule";
import { Ship } from "../Ship";
import { ObjectInterfaces } from "../../../../shared/scripts/ObjectInterfaces";
import { GameObject } from "../GameObject";
import { ICharacter } from "../../../../shared/interfaces/ICharacter";
import { Stats } from "../../../../shared/stats/Stats";
import { GameScene, EParticleManagerType } from "../../scenes/GameScene";
import { GameObjectHandler } from "../../modules/GameObjectHandler";
import { Utils } from "../../../../shared/scripts/Utils";

export class WeaponShipModule extends ShipModule {

    private bulletEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
    private static ANGLE_TO_DEGREE: number = 57.2957795;
    private weaponParticleRandomizer: number;
    private weaponParticleRandomizerTimer: number;
    private weaponParticleRandomizerDirection: boolean;

    constructor(ship: Ship, _module: ObjectInterfaces.IShipModuleInstance, thisPlayerShip: boolean) {
        super(ship, _module, thisPlayerShip);
        //@ts-ignore
        this.bulletEmitter = GameScene.getInstance().getParticleManager(EParticleManagerType.SMALL_BULLET).createEmitter({
            x: 0,
            y: 0,
            lifespan: 700, //TODO change so this depend on distance between ships
            speed: { min: 300, max: 400 },
            angle: 330,
            gravityY: 0,
            scale: { start: 2, end: 0.5},
            quantity: 1,
            frequency: 50
        });  
        this.weaponParticleRandomizer = 0;
        this.weaponParticleRandomizerTimer = Utils.getRandomNumber(0, 100);
        this.weaponParticleRandomizerDirection = true;
    }


    public update() {
        super.update();
        this.updateBulletParticles();
    }

    private updateBulletParticles() {
        let shipData : ICharacter = this.getShip().getData();
        this.bulletEmitter.visible = false;
        if(shipData.state.isAttacking) {
            let targetObject: GameObject | undefined = GameObjectHandler.getGameObjectsMap().get(shipData.state.targetId);
            if(targetObject != undefined && this.targetInRange(targetObject, shipData)) {
                if(this.weaponParticleRandomizerTimer <= 0) {
                    this.weaponParticleRandomizerTimer = Utils.getRandomNumber(50, 100);
                    let randomNumber = Utils.getRandomNumber(0, 15);
                    if(this.weaponParticleRandomizerDirection) {
                        randomNumber = -randomNumber;
                    }
                    this.weaponParticleRandomizer = WeaponShipModule.ANGLE_TO_DEGREE + randomNumber;
                    this.weaponParticleRandomizerDirection = !this.weaponParticleRandomizerDirection;
                }
                this.weaponParticleRandomizerTimer -= 1;
                let angle = Phaser.Math.Angle.Between(this.getCalculatedModuleX(), this.getCalculatedModuleY(), targetObject.getGameObjectData().x, targetObject.getGameObjectData().y)
                this.bulletEmitter.angle.onChange(angle * this.weaponParticleRandomizer);
                this.bulletEmitter.visible = true;
            }
        }
        this.bulletEmitter.startFollow(this.getSprite());
    }

    private targetInRange(target : GameObject, shipData : ICharacter): boolean {
        let range = shipData.stats[Stats.EStatType.weapon_range];
        let targetPos = new Phaser.Math.Vector2(target.getGameObjectData().x, target.getGameObjectData().y);
        let shipPos = new Phaser.Math.Vector2(shipData.x, shipData.y);
        return targetPos.subtract(shipPos).length() <= range;
    }
}
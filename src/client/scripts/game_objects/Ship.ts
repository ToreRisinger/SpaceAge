import { RadarDetectable } from "./RadarDetectable";
import { SPRITES } from "../../../shared/scripts/SPRITES";
import { ICargo } from "../../../shared/interfaces/ICargo";
import { Stats } from "../../../shared/stats/Stats";
import { ICharacter } from "../../../shared/interfaces/ICharacter";
import { ShipModuleWrapper } from "./shipmodule/ShipModuleWrapper";
import { GameObject } from "./GameObject";
import { GameObjectHandler } from "../modules/GameObjectHandler";
import { GameScene, EParticleManagerType} from "../scenes/GameScene";
import { Utils } from "../../../shared/scripts/Utils";
import { ObjectInterfaces } from "../../../shared/scripts/ObjectInterfaces";
import { Graphics } from "../modules/graphics/Graphics";

export class Ship extends RadarDetectable {
    
    private armorDamageParticleEmitter: Graphics.ParticleEmitter;
    private thrustParticleEmitter: Graphics.ParticleEmitter;
    private shieldDamageParticleEmitter: Graphics.ParticleEmitter;
    private damageParticleTimer: number;
    private static DAMAGE_EFFECT_TIME: number = 10;

    private characterData : ICharacter;
    private shipModuleWrapper : ShipModuleWrapper;
    private shipCargo : ICargo;
    private characterName : string;

    constructor(characterData : ICharacter, thisPlayerShip : boolean, characterName: string) {
        super(characterData, SPRITES.SHIP_ICON.sprite, thisPlayerShip, false);
        this.characterData = characterData;
        this.characterName = characterName;
        this.shipCargo = {
            items : []
        }

        this.shipModuleWrapper = new ShipModuleWrapper(this, thisPlayerShip);

        if(thisPlayerShip) {
            this.setIconBaseColor(0x00ff00);
        }

        //@ts-ignore
        this.shieldDamageParticleEmitter = new Graphics.ParticleEmitter({
            x: 0,
            y: 0,
            lifespan: 100,
            speed: { min: 100, max: 200 },
            gravityY: 0,
            scale: { start: 5, end: 5},
            quantity: 1,
            frequency: 10
        }, EParticleManagerType.SHIELD_DAMAGE);
        
        //@ts-ignore
        this.armorDamageParticleEmitter = new Graphics.ParticleEmitter({
            x: 0,
            y: 0,
            lifespan: 100,
            speed: { min: 100, max: 600 },
            gravityY: 0,
            scale: { start: 1, end: 1},
            quantity: 2,
            frequency: 10
        }, EParticleManagerType.ARMOR_DAMAGE);

        //@ts-ignore
        this.thrustParticleEmitter = new Graphics.ParticleEmitter({
            x: 0,
            y: 0,
            lifespan: 3000,
            angle: 0,
            speed: { min: 0, max: 1 },
            gravityY: 0,
            scale: { start: 3, end: 0.1},
            quantity: 1,
            frequency: 1
        }, EParticleManagerType.THRUST);
        
        this.thrustParticleEmitter.stop();
        this.armorDamageParticleEmitter.stop();
        this.shieldDamageParticleEmitter.stop();
        this.damageParticleTimer = Ship.DAMAGE_EFFECT_TIME;
    }

    public setCargo(cargo : ICargo) {
        this.shipCargo = cargo;
    }

    public getCargo() : ICargo {
        return this.shipCargo;
    }

    public updateDataObjectConfig(characterData : ICharacter) {
        super.updateDataObjectConfig(characterData);
        this.characterData = characterData;
    }

    public update() {
        this.shipModuleWrapper.update();
        super.update();
        this.updateTargetDamageEffects();
    }

    public getDisplayInformation() : Array<string> {
        return new Array<string>(
            "Speed: " + Math.round(this.getData().state.meters_per_second), 
            "Shield: " + this.getData().properties.currentShield,
            "Armor: " + this.getData().properties.currentArmor,
            "Hull: " + this.getData().properties.currentHull,
            "Mass: " + this.getData().stats[Stats.EStatType.mass] + " kg",
        );
    }

    private updateTargetDamageEffects() { 
        this.shieldDamageParticleEmitter.stop();
        this.armorDamageParticleEmitter.stop();
        this.shieldDamageParticleEmitter.stop();
        
        if(this.characterData.state.isAttacking) {
            let targetObject: GameObject | undefined = GameObjectHandler.getGameObjectsMap().get(this.characterData.state.targetId);
            if(targetObject != undefined 
                && this.targetInRange(targetObject, this.characterData)
                && targetObject instanceof Ship) {

                if(targetObject.getData().properties.currentShield > 0) {
                    this.shieldDamageParticleEmitter.start();
                    if(this.damageParticleTimer <= 0) {
                        let targetModuleLength = targetObject.getData().modules.length;
                        let moduleToShowDamageOn : ObjectInterfaces.IShipModuleInstance = targetObject.getData().modules[Utils.getRandomNumber(0, targetModuleLength - 1)];
                        let x = targetObject.getGameObjectData().x + Utils.getRandomNumber(-100, 100) + moduleToShowDamageOn.x * 38;
                        let y = targetObject.getGameObjectData().y + Utils.getRandomNumber(-100, 100) + moduleToShowDamageOn.y * 38;
                        this.shieldDamageParticleEmitter.setPos(x, y);
                        this.damageParticleTimer = Ship.DAMAGE_EFFECT_TIME;
                    }
                } else {
                    this.armorDamageParticleEmitter.start();
                    if(this.damageParticleTimer <= 0) {
                        let targetModuleLenght = targetObject.getData().modules.length;
                        let moduleToShowDamageOn : ObjectInterfaces.IShipModuleInstance = targetObject.getData().modules[Utils.getRandomNumber(0, targetModuleLenght - 1)];
                        let x = targetObject.getGameObjectData().x + moduleToShowDamageOn.x * 38;
                        let y = targetObject.getGameObjectData().y + moduleToShowDamageOn.y * 38;
                        this.armorDamageParticleEmitter.setPos(x, y);
                        this.damageParticleTimer = Ship.DAMAGE_EFFECT_TIME;
                    }
                }
                
                this.damageParticleTimer--;
            }
        }

        if(this.getData().state.isMoving) {
            let velVec : Phaser.Math.Vector2 = new Phaser.Math.Vector2(this.getData().state.velVec[0], this.getData().state.velVec[1]);
            let pos : Phaser.Math.Vector2 = this.getPos();
            let oppositeVelVec = velVec.multiply(new Phaser.Math.Vector2(-1, -1)).add(pos);

            let angle = Phaser.Math.Angle.Between(pos.x, pos.y, oppositeVelVec.x, oppositeVelVec.y);
            this.thrustParticleEmitter.setPos(pos.x, pos.y);
            this.thrustParticleEmitter.setAngle(angle * Utils.ANGLE_TO_DEGREE);
            this.thrustParticleEmitter.start();
        }

        this.thrustParticleEmitter.update();
        this.armorDamageParticleEmitter.update();
        this.shieldDamageParticleEmitter.update();
    }

    public getIsMoving() {
        return this.characterData.state.isMoving;
    }

    public getDestinationPos() {
        return new Phaser.Math.Vector2(Math.floor(this.characterData.state.destVec[0]), Math.floor(this.characterData.state.destVec[1]));
    }

    public destroy() {
        this.shipModuleWrapper.destroy();
        super.destroy();
    }

    public getData() : ICharacter {
        return this.characterData;
    }

    public getDisplayName() : string {
        return this.characterName;
    }

    protected getRadarMass() : number {
        return this.characterData.stats[Stats.EStatType.mass] * ( 1 - this.characterData.stats[Stats.EStatType.radar_signature_reduction] / 100)
    }

    protected setVisible(value : boolean) : void {
        this.shipModuleWrapper.setVisible(value);
    }

    private targetInRange(target : GameObject, shipData : ICharacter): boolean {
        let range = shipData.stats[Stats.EStatType.weapon_range];
        let targetPos = new Phaser.Math.Vector2(target.getGameObjectData().x, target.getGameObjectData().y);
        let shipPos = new Phaser.Math.Vector2(shipData.x, shipData.y);
        return targetPos.subtract(shipPos).length() <= range;
    }
}
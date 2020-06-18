import { RadarDetectable } from "./RadarDetectable";
import { ICargo } from "../../../shared/data/ICargo";
import { ICharacter } from "../../../shared/data/gameobject/ICharacter";
import { ShipModuleWrapper } from "./shipmodule/ShipModuleWrapper";
import { GameObject } from "./GameObject";
import { GameObjectHandler } from "../modules/GameObjectHandler";
import { GameScene, EParticleManagerType} from "../scenes/GameScene";
import { Utils } from "../../../shared/util/Utils";
import { Graphics } from "../modules/graphics/Graphics";
import { SPRITES } from "../../../shared/util/SPRITES";
import { EStatType } from "../../../shared/data/stats/EStatType";
import { IShipModuleInstance } from "../../../shared/data/IShipModuleInstance";

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

    public getIsMoving() {
        return this.characterData.state.isMoving;
    }

    public getDestinationVec() {
        return new Phaser.Math.Vector2(Math.floor(this.characterData.state.destVec[0]), Math.floor(this.characterData.state.destVec[1]));
    }

    public getVelVec() {
        return new Phaser.Math.Vector2(Math.floor(this.characterData.state.velVec[0]), Math.floor(this.characterData.state.velVec[1]));
    }

    public getMetersPerSecond() {
        return this.characterData.state.meters_per_second;
    }

    public getCurrentShield() {
        return this.characterData.properties.currentShield;
    }

    public getCurrentArmor() {
        return this.characterData.properties.currentArmor;
    }

    public getCurrentHull() {
        return this.characterData.properties.currentHull;
    }
    
    public setCargo(cargo : ICargo) {
        this.shipCargo = cargo;
    }

    public getCargo() : ICargo {
        return this.shipCargo;
    }

    public getModules() {
        return this.characterData.modules;
    }

    public getStat(statType: EStatType) {
        return this.characterData.stats[statType];
    }

    public updateData(characterData : ICharacter) {
        super.updateData(characterData);
        this.characterData = characterData;
    }

    public isAttacking(): boolean {
        return this.characterData.state.isAttacking;
    }

    public isMining(): boolean {
        return this.characterData.state.isMining;
    }

    public isWarping(): boolean {
        return this.characterData.state.isWarping;
    }

    public hasDestination(): boolean {
        return this.characterData.state.hasDestination;
    }

    public hasMiningLaser(): boolean {
        return this.characterData.state.hasMiningLaser;
    }

    public hasWeapon(): boolean {
        return this.characterData.state.hasWeapon;
    }

    public getTargetId(): number {
        return this.characterData.state.targetId;
    }

    public update() {
        this.shipModuleWrapper.update();
        super.update();
        this.updateTargetDamageEffects();
    }

    public getDisplayInformation() : Array<string> {
        return new Array<string>(
            "Speed: " + Math.round(this.getMetersPerSecond()), 
            "Shield: " + this.getCurrentShield(),
            "Armor: " + this.getCurrentArmor(),
            "Hull: " + this.getCurrentHull(),
            "Mass: " + this.getStat(EStatType.mass) + " kg",
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

                if(targetObject.getCurrentShield() > 0) {
                    this.shieldDamageParticleEmitter.start();
                    if(this.damageParticleTimer <= 0) {
                        let targetModuleLength = targetObject.getModules().length;
                        let moduleToShowDamageOn : IShipModuleInstance = targetObject.getModules()[Utils.getRandomNumber(0, targetModuleLength - 1)];
                        let pos = targetObject.getPos();
                        let x = pos.x + Utils.getRandomNumber(-100, 100) + moduleToShowDamageOn.x * 38;
                        let y = pos.y + Utils.getRandomNumber(-100, 100) + moduleToShowDamageOn.y * 38;
                        this.shieldDamageParticleEmitter.setPos(x, y);
                        this.damageParticleTimer = Ship.DAMAGE_EFFECT_TIME;
                    }
                } else {
                    this.armorDamageParticleEmitter.start();
                    if(this.damageParticleTimer <= 0) {
                        let targetModuleLenght = targetObject.getModules().length;
                        let moduleToShowDamageOn : IShipModuleInstance = targetObject.getModules()[Utils.getRandomNumber(0, targetModuleLenght - 1)];
                        let pos = targetObject.getPos();
                        let x = pos.x + moduleToShowDamageOn.x * 38;
                        let y = pos.y + moduleToShowDamageOn.y * 38;
                        this.armorDamageParticleEmitter.setPos(x, y);
                        this.damageParticleTimer = Ship.DAMAGE_EFFECT_TIME;
                    }
                }
                
                this.damageParticleTimer--;
            }
        }

        if(this.getIsMoving()) {
            let velVec : Phaser.Math.Vector2 = this.getVelVec();
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

    public destroy() {
        this.shipModuleWrapper.destroy();
        super.destroy();
    }

    public getCharacterName() : string {
        return this.characterName;
    }

    protected getRadarMass() : number {
        return this.characterData.stats[EStatType.mass] * ( 1 - this.characterData.stats[EStatType.radar_signature_reduction] / 100)
    }

    protected setVisible(value : boolean) : void {
        this.shipModuleWrapper.setVisible(value);
    }

    private targetInRange(target : GameObject, shipData : ICharacter): boolean {
        let range = shipData.stats[EStatType.weapon_range];
        let targetPos = target.getPos();
        let shipPos = new Phaser.Math.Vector2(shipData.x, shipData.y);
        return targetPos.subtract(shipPos).length() <= range;
    }
}
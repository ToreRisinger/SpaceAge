import { RadarDetectable } from "./RadarDetectable";
import { Graphics } from "../modules/graphics/Graphics";
import { ShipModuleWrapper } from "./shipmodule/ShipModuleWrapper";
import { EStatType } from "../../../shared/data/stats/EStatType";
import { GameObject } from "./GameObject";
import { GameObjectHandler } from "../modules/GameObjectHandler";
import { IShipModuleInstance } from "../../../shared/data/shipmodule/IShipModuleInstance";
import { IShip } from "../../../shared/data/gameobject/IShip";
import { Utils } from "../../../shared/util/Utils";
import { DRAW_LAYERS } from "../constants/DRAW_LAYERS";
import { ISprite } from "../../../shared/data/ISprite";
import { GlobalDataService } from "../modules/GlobalDataService";
import { SPRITES } from "../../../shared/util/SPRITES";

export class CShip extends RadarDetectable {
    
    private armorDamageParticleEmitter: Graphics.ParticleEmitter;
    private thrustParticleEmitter: Graphics.ParticleEmitter;
    private shieldDamageParticleEmitter: Graphics.ParticleEmitter;
    private damageParticleTimer: number;
    private static DAMAGE_EFFECT_TIME: number = 10;

    private shipData : IShip;
    private shipModuleWrapper : ShipModuleWrapper;

    private attackingIcon: Graphics.TargetSprite;

    constructor(shipData : IShip, icon: ISprite, thisPlayerShip : boolean) {
        super(shipData, icon, thisPlayerShip, false, true);
        this.shipData = shipData;

        this.shipModuleWrapper = new ShipModuleWrapper(this, thisPlayerShip);

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
        }, Graphics.EParticleManagerType.SHIELD_DAMAGE, DRAW_LAYERS.GRAPHICS_LAYER);
        
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
        }, Graphics.EParticleManagerType.ARMOR_DAMAGE, DRAW_LAYERS.GRAPHICS_LAYER);

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
        }, Graphics.EParticleManagerType.THRUST, DRAW_LAYERS.BACKGROUND_EFFECT_LAYER);
        
        this.thrustParticleEmitter.stop();
        this.armorDamageParticleEmitter.stop();
        this.shieldDamageParticleEmitter.stop();
        this.damageParticleTimer = CShip.DAMAGE_EFFECT_TIME;
        this.attackingIcon = new Graphics.TargetSprite(SPRITES.ATTACKING_ICON.sprite, 0, 0);
    }

    public updateData(shipData : IShip) {
        let wasAttackingPlayer = this.isAttackingPlayer();
        super.updateData(shipData);
        this.shipData = shipData;
        this.attackingIcon.setVisible(this.isAttackingPlayer() && this.isVisible());

        if(!wasAttackingPlayer && this.isAttackingPlayer()) {
            this.attackingIcon.trigger();
        }
    }

    public update(time: number, delta: number) {
        super.update(time, delta);
    }

    public updateGraphics(time: number, delta: number) {
        super.updateGraphics(time, delta);
        this.shipModuleWrapper.update();  
        this.updateTargetDamageEffects();

        if(this.isAttackingPlayer()) {
            let pos = this.getPos();
            this.attackingIcon.setPos(pos.x, pos.y);
            this.attackingIcon.update();
        }
    }

    public getIsMoving() {
        return this.shipData.state.isMoving;
    }

    public getDestinationVec() {
        return new Phaser.Math.Vector2(Math.floor(this.shipData.state.destVec[0]), Math.floor(this.shipData.state.destVec[1]));
    }

    public getVelVec() {
        return new Phaser.Math.Vector2(Math.floor(this.shipData.state.velVec[0]), Math.floor(this.shipData.state.velVec[1]));
    }

    public getMetersPerSecond() {
        return this.shipData.state.meters_per_second;
    }

    public getCurrentShield() {
        return this.shipData.properties.currentShield;
    }

    public getCurrentArmor() {
        return this.shipData.properties.currentArmor;
    }

    public getCurrentHull() {
        return this.shipData.properties.currentHull;
    }

    public getModules() {
        return this.shipData.modules;
    }

    public getStat(statType: EStatType) {
        return this.shipData.stats[statType];
    }

    public isAttacking(): boolean {
        return this.shipData.state.isAttacking;
    }

    public isMining(): boolean {
        return this.shipData.state.isMining;
    }

    public hasDestination(): boolean {
        return this.shipData.state.hasDestination;
    }

    public getTargetId(): number {
        return this.shipData.state.targetId;
    }

    public getDisplayInformation() : Array<string> {
        return new Array<string>(
            "Mass: " + this.getStat(EStatType.mass) + " kg",
        );
    }

    private updateTargetDamageEffects() { 
        this.shieldDamageParticleEmitter.stop();
        this.armorDamageParticleEmitter.stop();
        this.shieldDamageParticleEmitter.stop();
        
        if(this.isAttacking()) {
            let targetObject: GameObject | undefined = GameObjectHandler.getGameObjectsMap().get(this.shipData.state.targetId);
            if(targetObject != undefined 
                && this.targetInRange(targetObject, this)
                && targetObject instanceof CShip) {

                if(targetObject.getCurrentShield() > 0) {
                    this.shieldDamageParticleEmitter.start();
                    if(this.damageParticleTimer <= 0) {
                        let targetModuleLength = targetObject.getModules().length;
                        let moduleToShowDamageOn : IShipModuleInstance = targetObject.getModules()[Utils.getRandomNumber(0, targetModuleLength - 1)];
                        let pos = targetObject.getPos();
                        let x = pos.x + Utils.getRandomNumber(-100, 100) + moduleToShowDamageOn.x * 38;
                        let y = pos.y + Utils.getRandomNumber(-100, 100) + moduleToShowDamageOn.y * 38;
                        this.shieldDamageParticleEmitter.setPos(x, y);
                        this.damageParticleTimer = CShip.DAMAGE_EFFECT_TIME;
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
                        this.damageParticleTimer = CShip.DAMAGE_EFFECT_TIME;
                    }
                }
                
                this.damageParticleTimer--;
            }
        }

        if(this.shouldShowThrustEffect()) {
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
        this.thrustParticleEmitter.destroy();
        this.armorDamageParticleEmitter.destroy();
        this.shieldDamageParticleEmitter.destroy();
        this.attackingIcon.destroy();
        super.destroy();
    }

    public getName() : string {
        return this.shipData.name;
    }

    protected getRadarMass() : number {
        return this.shipData.stats[EStatType.mass] * ( 1 - this.shipData.stats[EStatType.radar_signature_reduction] / 100)
    }

    protected setVisible(value : boolean) : void {
        super.setVisible(value);
        this.shipModuleWrapper.setVisible(value);
        this.thrustParticleEmitter.setVisible(value);
        this.shieldDamageParticleEmitter.setVisible(value);
        this.armorDamageParticleEmitter.setVisible(value);
    }

    private targetInRange(target : GameObject, ship : CShip): boolean {
        let range = ship.getStat(EStatType.weapon_range);
        let targetPos = target.getPos();
        return targetPos.subtract(ship.getPos()).length() <= range;
    }

    private isAttackingPlayer(): boolean {
        return this.shipData.state.isAttacking && this.shipData.state.targetId == GlobalDataService.getInstance().getPlayerShip().getId();
    }

    protected shouldShowThrustEffect(): boolean {
        return this.getIsMoving();
    }
}
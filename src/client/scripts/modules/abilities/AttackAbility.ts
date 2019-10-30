import { Ability } from "./Ability";

export class AttackAbility extends Ability {

    public activate() : void {

    }

    public canActivate() : boolean {
        return true;
    }

    public update(time : number, delta : number) : void {

    }

    public getName() : string {
        return "Attack";
    }

    public getDescription() : string {
        return "Activate all weapon modules to attack the target.";
    }

    public getIconPath(): string {
        return "icons/ship_icon.png";
    }

    public hasCooldown() : boolean {
        return false;
    }

    public getCooldown(): number {
        return 0;
    }

    public getCooldownRemaining() : number {
        return 0;
    }

}
export class GameObject {

    protected posVec : Phaser.Math.Vector2;

    constructor() {
        this.posVec = new Phaser.Math.Vector2(0, 0);
    }

    public getPos() {
        return this.posVec;
    }

    public setPos(posVec : Phaser.Math.Vector2) {
        this.posVec = posVec;
    }

    public update() {
        
    }

    public destroy() {
        
    }
}
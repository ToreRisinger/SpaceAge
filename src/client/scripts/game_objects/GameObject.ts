export class GameObject {

    protected x : number;
    protected y : number;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    public getX() {
        return this.x;
    }

    public setX(x : number) {
        this.x = x;
    }

    public  getY() {
        return this.y;
    }

    public setY(y : number) {
        this.y = y;
    }

    public setPos(x : number, y : number) {
        this.x = x;
        this.x = y;
    }
}
export module DataObjects {

    export interface Game_Object_Config {
        id : number,
        x : number,
        y : number
    }

    export interface Ship_Config extends Game_Object_Config {
        speed: number
        maxSpeed: number,
        isMoving : boolean,
        destinationX : number,
        destinationY : number,
        acceleration : number,
        velVec : Array<number>
    }

    export interface Player {
        socket: any,
        ship: Ship_Config
    }
}
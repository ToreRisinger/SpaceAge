export module DataObjects {

    export interface Ship {
        id: number,
        x : number,
        y : number,
        speed: number,
        maxSpeed: number,
        isMoving : boolean,
        destinationX : number,
        destinationY : number,
        acceleration : number,
        velVec : Array<number>
    }

    export interface Player {
        socket: any,
        ship: Ship
    }
}
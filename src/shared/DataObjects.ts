export module DataObjects {

    export interface Ship {
        id: number,
        x : number,
        y : number,
        speed: number,
        isMoving : boolean,
        destinationX : number,
        destinationY : number
    }

    export interface Player {
        socket: any,
        ship: Ship
    }
}
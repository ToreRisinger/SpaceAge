
export module FpsCounter {
    
    let fps: number;
    let deltaPoints: Array<number>;

    export function init() {
        fps = 0
        deltaPoints = new Array();
    }

    export function update(time : number, delta : number) {
        deltaPoints.push(delta);
        while(deltaPoints.length > 10) {
            deltaPoints.shift();
        }

        let total = 0;
        for(let i = 0; i < deltaPoints.length; i++) {
            total += deltaPoints[i];
        }
        fps = total / deltaPoints.length;
    }

    export function getFps(): number {
        return Math.floor(1000/fps);
    }

}
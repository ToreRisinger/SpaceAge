
export module Utils {

    export let ANGLE_TO_DEGREE: number = 57.2957795;

    export function screenVecToMapVec(vector : Phaser.Math.Vector2, cameraX : number, cameraY : number, cameraWidth : number, cameraHeight : number) : Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(cameraX - (cameraWidth / 2) + vector.x, cameraY - (cameraHeight / 2) + vector.y)
    }

    export function formatMeters(meters : number) : string {
        let ret : string = "";
        if(meters < 1000) {
            ret = Math.round(meters) + " m";
        } else if(meters >= 1000){
            let km = Math.round(meters / 1000);
            if(km > 1000000) {
                let millionKm = Math.round(km / 1000000);
                if(millionKm >= 150) {
                    let au = Math.round(millionKm / 150);
                    ret = au + " A.U.";
                } else {
                    ret = millionKm + " million km";
                }
            } else {
                ret = km + " km";
            }
        }

        return ret;
    }

    export function getRandomNumber(min : number, max : number) {
        return Math.round(Math.random() * (max - min) + min);
    }

    export function chance(percentage: number) {
        return getRandomNumber(1, 100) <= percentage;
    }

    export function vec2Length(vec2 : Array<number>) {
        return Math.sqrt((vec2[0] * vec2[0]) + (vec2[1] * vec2[1]));
    };

    export async function delay(ms: number) {
        await new Promise(resolve => setTimeout(()=>resolve(), ms));
    }
}
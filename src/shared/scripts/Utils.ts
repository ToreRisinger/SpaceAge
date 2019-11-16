
export module Utils {

    export function screenVecToMapVec(vector : Phaser.Math.Vector2, cameraX : number, cameraY : number, cameraWidth : number, cameraHeight : number) : Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(cameraX - (cameraWidth / 2) + vector.x, cameraY - (cameraHeight / 2) + vector.y)
    }

    export function formatMeters(meters : number) : string {
        let ret : string = "";
        if(meters < 1000) {
            ret = Math.floor(meters) + " m";
        } else if(meters > 1000){
            let km = Math.floor(meters / 1000);
            if(km > 1000000) {
                let millionKm = Math.floor(km / 1000000);
                if(millionKm >= 150) {
                    let au = Math.floor(millionKm / 150);
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
        return Math.random() * (max - min) + min;
    }
}
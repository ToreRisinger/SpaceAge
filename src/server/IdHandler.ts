

export module IdHandler {
    
    //let nextClientId = 0;
    let nextGameObjectId = 0;
    let nextItemId = 0;

    export function getNewItemId() {
        return nextItemId++;
    }

    /*
    export function getNewClientId() {
        return nextClientId++;
    }
    */

    export function getNewGameObjectId() {
        return nextGameObjectId++;
    }

}
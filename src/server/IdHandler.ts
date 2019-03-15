

export module IdHandler {
    
    let nextPlayerId = 0;
    let nextGameObjectId = 0;
    let nextItemId = 0;

    export function getNewItemId() {
        return nextItemId++;
    }

    export function getNewPlayerId() {
        return nextPlayerId++;
    }

    export function getNewGameObjectId() {
        return nextGameObjectId++;
    }

}
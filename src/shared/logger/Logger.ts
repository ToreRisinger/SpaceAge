export module Logger {

    let debugMode: boolean = false;

    export function setDebug(value: boolean) {
        debugMode = value;
    }

    export function info(msg: string) {
        console.log("[INFO] : " + msg);
    }

    export function debug(msg: string) {
        if(debugMode) {
            console.log("[DEBUG]: " + msg);
        }
    }

    export function error(msg: string) {
        console.log("[ERROR]: " + msg);
    }

}
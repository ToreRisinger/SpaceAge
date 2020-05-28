import { RadarDetectable } from "../game_objects/RadarDetectable";

import { Ship } from "../game_objects/Ship";

import { Sector } from "../game_objects/Sector";

export class GlobalDataService {

    private static _instance : GlobalDataService;
    /* Player */
    private username : String;
    private playerShip : Ship;
    private sector : Sector;

    private selectedObject : RadarDetectable | undefined;
    private targetObject : RadarDetectable | undefined;

    /* Camera */
    private cameraZoom : number = 1;
    private cameraX : number = 0;
    private cameraY : number = 0;
    private cameraWidth : number = 0;
    private cameraHeight : number = 0;

    /* Server */
    private ping : number = 1;

    constructor(username : String, playerShip : Ship, sector : Sector) {
        this.username = username;
        this.playerShip = playerShip;
        this.sector = sector;
    }

    static createInstance(username : String, playerShip : Ship, sector : Sector) {
        GlobalDataService._instance = new GlobalDataService(username, playerShip, sector);
    }

    static getInstance() : GlobalDataService {
        return GlobalDataService._instance;
    }

    public getUsername() : String {
        return this.username;
    }

    public getPlayerShip() : Ship {
        return this.playerShip;
    }

    public getSector() : Sector {
        return this.sector;
    }

    public getSelectedObject() : RadarDetectable | undefined {
        return this.selectedObject;
    }

    public getTargetObject() : RadarDetectable | undefined {
        return this.targetObject;
    }

    /* Camera */
    public getCameraZoom() : number {
        return this.cameraZoom;
    }

    public getCameraX() : number {
        return this.cameraX;
    }

    public getCameraY() : number {
        return this.cameraY;
    }

    public getCameraWidth() : number {
        return this.cameraWidth;
    }

    public getCameraHeight() : number {
        return this.cameraHeight
    }

    public setCameraZoom(value : number) : void {
        this.cameraZoom = value;
    }

    public setCameraX(value : number) : void {
        this.cameraX = value;
    }

    public setCameraY(value : number) : void {
        this.cameraY = value;
    }

    public setCameraWidth(value : number) : void {
        this.cameraWidth = value;
    }

    public setCameraHeight(value : number) : void {
        this.cameraHeight = value;
    }
}
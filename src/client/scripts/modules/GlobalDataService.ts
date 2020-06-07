import { RadarDetectable } from "../game_objects/RadarDetectable";

import { Ship } from "../game_objects/Ship";

import { Sector } from "../game_objects/Sector";
import { ICharacter } from "../../../shared/interfaces/ICharacter";

export class GlobalDataService {

    private static _instance : GlobalDataService;
    /* Player */
    private character : ICharacter;
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


    constructor(character: ICharacter, playerShip : Ship, sector : Sector) {
        this.character = character;
        this.username = character.name;
        this.playerShip = playerShip;
        this.sector = sector;
    }

    static createInstance(character: ICharacter, playerShip : Ship, sector : Sector) {
        GlobalDataService._instance = new GlobalDataService(character, playerShip, sector);
    }

    static getInstance() : GlobalDataService {
        return GlobalDataService._instance;
    }

    public getCharacter() : ICharacter {
        return this.character;
    }

    public setCharacter(character : ICharacter): void {
        this.character = character;
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

    public setSector(sector : Sector) : void {
        this.sector = sector;
    }

    public getSelectedObject() : RadarDetectable | undefined {
        return this.selectedObject;
    }

    public getTargetObject() : RadarDetectable | undefined {
        return this.targetObject;
    }

    public setSelectedObject(value : RadarDetectable | undefined) {
        this.selectedObject = value;
    }

    public setTargetObject(value : RadarDetectable | undefined) {
        this.targetObject = value;
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
import { RadarDetectable } from "../game_objects/RadarDetectable";
import { CCharacter } from "../game_objects/CCharacter";
import { CSector } from "../game_objects/CSector";
import { ICharacter } from "../../../shared/data/gameobject/ICharacter";
import { PlanetInfo } from "../../../shared/data/planet/PlanetInfo";
import { IPlanet } from "../../../shared/data/planet/IPlanet";

export class GlobalDataService {

    private static _instance : GlobalDataService;
    /* Player */
    private character : ICharacter;
    private characterName : string;
    private playerShip : CCharacter;
    private sector : CSector;
    
    private planet: IPlanet;

    private selectedObject : RadarDetectable | undefined;
    private targetObject : RadarDetectable | undefined;

    /* Camera */
    private cameraZoom : number = 1;
    private cameraX : number = 0;
    private cameraY : number = 0;
    private cameraWidth : number = 0;
    private cameraHeight : number = 0;


    constructor(character: ICharacter, playerShip : CCharacter, sector : CSector) {
        this.character = character;
        this.characterName = character.name;
        this.playerShip = playerShip;
        this.sector = sector;
        //@ts-ignore
        this.planet = PlanetInfo.getPlanets().find(obj => obj.name == "Mars");
    }

    static createInstance(character: ICharacter, playerShip : CCharacter, sector : CSector) {
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

    public getCharacterName() : string {
        return this.characterName;
    }

    public getPlayerShip() : CCharacter {
        return this.playerShip;
    }

    public getSector() : CSector {
        return this.sector;
    }

    public setSector(sector : CSector) : void {
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

    public getThisPlanet() : IPlanet {
        return this.planet;
    }
}
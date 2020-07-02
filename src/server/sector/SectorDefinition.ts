export namespace SectorDefinition {

    export interface ISectorDef {
        type: string
    }

    export interface IAsteroidDef extends ISectorDef {
        type: "asteroid"
        asteroidType: string,
        asteroidHardness: number,
        asteroidGenerationRate: number,
        asteroidMinSize: number,
        asteroidMaxSize: number,
        maxNumberOfAsteroids: number
    }

    export function instanceOfIAsteroidDef(object: any): object is IAsteroidDef {
        return object.type === 'asteroid';
    }

    export interface ISmugglerDef extends ISectorDef {
        type: "smuggler",
        level: 1,
        locations: 2,
        spawnRate: 1,
        maxNrOfNpcs: 5
    }

    export function instanceOfISmugglerDef(object: any): object is ISmugglerDef {
        return object.type === 'smuggler';
    }

    export interface IPirateDef extends ISectorDef  {
        type: "pirate",
        level: 1,
        locations: 2,
        spawnRate: 1,
        maxNrOfNpcs: 5
    }

    export function instanceOfIPirateDef(object: any): object is IPirateDef {
        return object.type === 'pirate';
    }

    export interface ISpaceStationDef extends ISectorDef  {
        type: "space-station"
    }

    export function instanceOfISpaceStationDef(object: any): object is ISpaceStationDef {
        return object.type === 'space-station';
    }
}
import { ICharacter } from "../../shared/data/gameobject/ICharacter";

export interface IClient {
    socket: any,
    character: ICharacter,
    id: number
}
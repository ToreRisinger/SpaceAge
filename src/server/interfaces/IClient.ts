import { ICharacter } from "../../shared/interfaces/ICharacter";

export interface IClient {
    socket: any,
    character: ICharacter,
    id: number
}
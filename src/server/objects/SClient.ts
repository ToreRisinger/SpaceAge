import { IClient } from "../interfaces/IClient";
import { ICharacter } from "../../shared/interfaces/ICharacter";
import { IdHandler } from "../IdHandler";
import { SCharacter } from "./SCharacter";

export class SClient {

    private client: IClient;
    private character : SCharacter;

    constructor(socket: any, character: SCharacter) {
        this.character = character;
        this.client = {
            socket: socket,
            character: this.character.getData(),
            id: IdHandler.getNewClientId()
        }
    }

    public getData() : IClient {
        return this.client
    }

    public getCharacter() : SCharacter {
        return this.character;
    }
}
import { IClient } from "../../server/interfaces/IClient";
import { ICharacter } from "../interfaces/ICharacter";
import { IdHandler } from "../../server/IdHandler";

export class Client {

    private client: IClient;

    constructor(socket: any, character: ICharacter) {
        this.client = {
            socket: socket,
            character: character,
            id: IdHandler.getNewClientId()
        }
    }

    public getData() : IClient {
        return this.client
    }
}
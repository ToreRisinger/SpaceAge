import { IClient } from "../interfaces/IClient";
import { SCharacter } from "./SCharacter";
import { Events } from "../../shared/util/Events";
import { SSector } from "../sector/Sector";

export class SClient {

    private client: IClient;
    private character : SCharacter;

    constructor(socket: any, character: SCharacter) {
        this.character = character;
        this.client = {
            socket: socket,
            character: this.character.getData(),
            id: character.getData().id
        }
    }

    public update40ms(sector: SSector) {
        this.character.update40ms(sector);
    }

    public update1000ms(sector: SSector) {
        this.character.update1000ms(sector);
    }

    public getData() : IClient {
        return this.client
    }

    public getCharacter() : SCharacter {
        return this.character;
    }

    public startTrainSkill(event: Events.TRAIN_SKILL_START_CONFIG) {
        this.character.startTrainSkill(event);
    }

    public stopTrainSkill() {
        this.character.stopTrainSkill();
    }
}
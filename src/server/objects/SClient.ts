import { IClient } from "../interfaces/IClient";
import { IdHandler } from "../IdHandler";
import { SCharacter } from "./SCharacter";
import { Events } from "../../shared/scripts/Events";import { Stats } from "../../shared/stats/Stats";
import { Skills } from "../../shared/skills/Skills";
;

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

    public update40ms() {
        this.character.update40ms();
    }

    public update1000ms() {
        this.character.update1000ms();
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
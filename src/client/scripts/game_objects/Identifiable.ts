import { IIdentifiable } from "../../../shared/data/gameobject/IIdentifiable";

export class Identifiable {

    private identifiableData : IIdentifiable;

    constructor(identifiableData : IIdentifiable) {
        this.identifiableData = identifiableData;
    }

    public getId() {
        return this.identifiableData.id;
    }

    public setId(id: number) {
        this.identifiableData.id = id;
    }

    public updateData(identifiableData : IIdentifiable) {
        this.identifiableData = identifiableData;
    }
}
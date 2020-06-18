export abstract class Command {

    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract run(): void;

    public getName(): string {
        return this.name;
    }

}
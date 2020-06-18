import { Command } from "../fw/Command";
import { Chat } from "../../Chat";

export class HelpCommand extends Command {

    private commands: Array<Command>;

    constructor() {
        super("help");
        this.commands = new Array();
    }

    public run(): void {
        this.commands.forEach(command => {
            Chat.addMessage(undefined, command.getName());
        })
    }

    public setCommands(commands: Array<Command>): void {
        this.commands = commands;
    }
}
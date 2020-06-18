import { Command } from "../fw/Command";
import { Chat } from "../../Chat";
import { Com } from "../../Com";

export class PingCommand extends Command {
    constructor() {
        super("ping");
    }

    public run(): void {
        Chat.addMessage(undefined, Com.getLatency() + "");
    }
}
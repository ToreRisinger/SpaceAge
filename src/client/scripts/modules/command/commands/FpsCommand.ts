import { Command } from "../fw/Command";
import { Chat } from "../../Chat";
import { FpsCounter } from "../../FpsCounter";

export class FpsCommand extends Command {
    constructor() {
        super("fps");
    }

    public run(): void {
        Chat.addMessage(undefined, FpsCounter.getFps() + "");
    }
}
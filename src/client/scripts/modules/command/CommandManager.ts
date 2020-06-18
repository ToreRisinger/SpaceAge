import { EventHandler } from "../EventHandler";
import { Events } from "../../../../shared/util/Events";
import { Command } from "./fw/Command";
import { PingCommand } from "./commands/PingCommand";
import { HelpCommand } from "./commands/HelpCommand";

export module CommandManager {

    let commandMap: Map<string, Command>;
    let helpCommand: HelpCommand;

    export function init() {
        commandMap = new Map();

        let pingCommand = new PingCommand();
        helpCommand = new HelpCommand();

        commandMap.set(pingCommand.getName(), pingCommand);
        commandMap.set(helpCommand.getName(), helpCommand);

        let commands : Array<Command> = new Array();
        commandMap.forEach(command => {
            commands.push(command)
        })
        helpCommand.setCommands(commands)

        subscribeToEvents();
    }

    function onCommand(event: Events.COMMAND_EVENT_CONFIG) {
        let command = commandMap.get(event.data.command);
        if(command != undefined) {
            command.run();
        } else {
            helpCommand.run();
        }
    }

    function subscribeToEvents() {
        EventHandler.on(Events.EEventType.COMMAND_EVENT, onCommand)
    }
}
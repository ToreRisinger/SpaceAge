import { Database } from "./database/Database";
import { SectorHandler } from "./sector/SectorHandler";
import { ComManager } from "./ComManager";
import { Logger } from "../shared/logger/Logger";
import { DamageService } from "./DamageService";
import { CombatLogManager } from "./CombatLogManager";

const UPDATES_PER_SECOND : number = 25;

const debug : boolean = true;

export module Server {

    let sectorHandler : SectorHandler;
    let comManager : ComManager;

    export function start(server : any) {
      Logger.setDebug(debug);
      Logger.info("Server started");
      Database.startDb();
    
      sectorHandler = new SectorHandler();
      comManager = new ComManager(server, sectorHandler);
      CombatLogManager.init(comManager);
      setupGameLoops();
    }  

    function setupGameLoops() {
      setInterval(update40ms, 1000/UPDATES_PER_SECOND);
      setInterval(update1000ms, 1000);
      setInterval(update1min, 1000);
    }

    function update40ms() {
      comManager.getClients().forEach(client => client.update40ms());
      sectorHandler.update40ms();
      comManager.update40ms();
    }

    function update1000ms() {
      comManager.getClients().forEach(client => client.update1000ms());
      sectorHandler.update1000ms();
      comManager.update1000ms();
    }

    function update1min() {
      comManager.update1min();
    }
}
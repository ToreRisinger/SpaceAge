import { Database } from "./database/Database";
import { SectorHandler } from "./SectorHandler";
import { ComManager } from "./ComManager";
import { Logger } from "../shared/logger/Logger";

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

      setupGameLoops();
    }  

    function setupGameLoops() {
      setInterval(update40ms, 1000/UPDATES_PER_SECOND);
      setInterval(update1000ms, 1000);
    }

    function update40ms() {
      sectorHandler.update40ms();
      comManager.update40ms();
    }

    function update1000ms() {
      sectorHandler.update1000ms();
      comManager.update1000ms();
    }
}
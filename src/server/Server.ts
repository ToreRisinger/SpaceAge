import { ObjectInterfaces } from "../shared/scripts/ObjectInterfaces";
import { Events } from "../shared/scripts/Events";
import { Database } from "./database/Database";
import { SectorHandler } from "./SectorHandler";
import { ComManager } from "./ComManager";

const UPDATES_PER_SECOND : number = 25;

export module Server {

    let sectorHandler : SectorHandler;
    let comManager : ComManager;

    export function start(server : any) {
      console.log('Server started')
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
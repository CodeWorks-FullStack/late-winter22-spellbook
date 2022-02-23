import { DndSpellsController } from "./Controllers/DndSpellsController.js";
import { MySpellsController } from "./Controllers/MySpellsController.js";

class App {
  dndSpellsController = new DndSpellsController()
  mySpellsController = new MySpellsController()
}

window["app"] = new App();

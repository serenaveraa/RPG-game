import { Router } from "express";
import { playersController } from "../controllers/playersController";
import { gameplayController } from "../controllers/gameplayController";

export const router = Router();

// Players
router.post("/players", playersController.create);
router.get("/players/:id", playersController.get);
router.put("/players/:id", playersController.update);

// Inventory
router.get("/players/:id/inventory", playersController.inventory);
router.delete("/players/:id/inventory/:itemId", playersController.deleteInventoryItem);

// Gathering / Locations
router.get("/locations", gameplayController.listLocations);
router.post("/players/:id/gather", gameplayController.gather);

// Crafting
router.get("/recipes", gameplayController.listRecipes);
router.get("/players/:id/recipes", gameplayController.learnableRecipes);
router.post("/players/:id/craft", gameplayController.craft);

export default router;



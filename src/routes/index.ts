import { Router } from "express";
import { playersController } from "../controllers/playersController";
import { gameplayController } from "../controllers/gameplayController";
import { z } from "zod";
import { validateBody } from "../middleware/validate";

export const router = Router();

// Players
const createPlayerSchema = z.object({ name: z.string().min(1) });
const updatePlayerSchema = z.object({
  level: z.number().int().positive().optional(),
  experience: z.number().int().min(0).optional(),
  skills: z.object({ mining: z.number().int().min(0), woodcutting: z.number().int().min(0), crafting: z.number().int().min(0) }).optional(),
});
const gatherSchema = z.object({ locationId: z.string() });
const craftSchema = z.object({ recipeId: z.string() });

router.post("/players", validateBody(createPlayerSchema), playersController.create);
router.get("/players/:id", playersController.get);
router.put("/players/:id", validateBody(updatePlayerSchema), playersController.update);

// Inventory
router.get("/players/:id/inventory", playersController.inventory);
router.delete("/players/:id/inventory/:itemId", playersController.deleteInventoryItem);

// Gathering / Locations
router.get("/locations", gameplayController.listLocations);
router.post("/players/:id/gather", validateBody(gatherSchema), gameplayController.gather);

// Crafting
router.get("/recipes", gameplayController.listRecipes);
router.get("/players/:id/recipes", gameplayController.learnableRecipes);
router.post("/players/:id/craft", validateBody(craftSchema), gameplayController.craft);

export default router;



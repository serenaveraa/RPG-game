import type { Request, Response } from "express";
import { gatherService } from "../services/gatherService";
import { craftingService } from "../services/craftingService";
// Validation handled by middleware (see routes)

export const gameplayController = {
  listLocations(_req: Request, res: Response) {
    res.json(gatherService.listLocations());
  },

  gather(req: Request, res: Response) {
    const playerId = req.params.id as string;
    const locationId = (req as any).validatedBody?.locationId ?? req.body?.locationId;
    const result = gatherService.performGather(playerId, locationId);
    if (!result.ok) return res.status(400).json({ message: result.error });
    res.json(result);
  },

  listRecipes(_req: Request, res: Response) {
    res.json(craftingService.listRecipes());
  },

  craft(req: Request, res: Response) {
    const playerId = req.params.id as string;
    const recipeId = (req as any).validatedBody?.recipeId ?? req.body?.recipeId;
    const result = craftingService.craft(playerId, recipeId);
    if (!result.ok) return res.status(400).json({ message: result.error });
    res.json(result);
  },

  learnableRecipes(req: Request, res: Response) {
    const playerId = req.params.id as string;
    res.json(craftingService.learnableRecipes(playerId));
  },
};



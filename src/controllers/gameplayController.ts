import type { Request, Response } from "express";
import { z } from "zod";
import { gatherService } from "../services/gatherService";
import { craftingService } from "../services/craftingService";

const gatherSchema = z.object({ locationId: z.string() });
const craftSchema = z.object({ recipeId: z.string() });

export const gameplayController = {
  listLocations(_req: Request, res: Response) {
    res.json(gatherService.listLocations());
  },

  gather(req: Request, res: Response) {
    const parsed = gatherSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Datos inválidos", details: parsed.error.flatten() });
    const playerId = req.params.id as string;
    const result = gatherService.performGather(playerId, parsed.data.locationId);
    if (!result.ok) return res.status(400).json({ message: result.error });
    res.json(result);
  },

  listRecipes(_req: Request, res: Response) {
    res.json(craftingService.listRecipes());
  },

  craft(req: Request, res: Response) {
    const parsed = craftSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Datos inválidos", details: parsed.error.flatten() });
    const playerId = req.params.id as string;
    const result = craftingService.craft(playerId, parsed.data.recipeId);
    if (!result.ok) return res.status(400).json({ message: result.error });
    res.json(result);
  },

  learnableRecipes(req: Request, res: Response) {
    const playerId = req.params.id as string;
    res.json(craftingService.learnableRecipes(playerId));
  },
};



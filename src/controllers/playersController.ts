import type { Request, Response } from "express";
import { z } from "zod";
import { playerService } from "../services/playerService";
import { omitUndefined } from "../utils/object";

const createPlayerSchema = z.object({ name: z.string().min(1) });
const updatePlayerSchema = z.object({
  level: z.number().int().positive().optional(),
  experience: z.number().int().min(0).optional(),
  skills: z
    .object({ mining: z.number().int().min(0), woodcutting: z.number().int().min(0), crafting: z.number().int().min(0) })
    .optional(),
});

export const playersController = {
  create(req: Request, res: Response) {
    const parsed = createPlayerSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Datos inválidos", details: parsed.error.flatten() });
    const player = playerService.createPlayer(parsed.data.name);
    res.status(201).json(player);
  },

  get(req: Request, res: Response) {
    const playerId = req.params.id as string;
    const player = playerService.getPlayer(playerId);
    if (!player) return res.status(404).json({ message: "Jugador no encontrado" });
    res.json(player);
  },

  update(req: Request, res: Response) {
    const parsed = updatePlayerSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Datos inválidos", details: parsed.error.flatten() });
    const playerId = req.params.id as string;
    const cleaned = omitUndefined(parsed.data);
    const updated = playerService.updatePlayer(playerId, cleaned as any);
    if (!updated) return res.status(404).json({ message: "Jugador no encontrado" });
    res.json(updated);
  },

  inventory(req: Request, res: Response) {
    const playerId = req.params.id as string;
    const player = playerService.getPlayer(playerId);
    if (!player) return res.status(404).json({ message: "Jugador no encontrado" });
    res.json(player.inventory);
  },

  deleteInventoryItem(req: Request, res: Response) {
    const playerId = req.params.id as string;
    const player = playerService.getPlayer(playerId);
    if (!player) return res.status(404).json({ message: "Jugador no encontrado" });
    const qty = Number(req.query.quantity ?? 1);
    const itemId = req.params.itemId as string;
    const ok = playerService.removeFromInventory(playerId, itemId, qty);
    if (!ok) return res.status(400).json({ message: "No se pudo eliminar el objeto" });
    res.status(204).send();
  },
};



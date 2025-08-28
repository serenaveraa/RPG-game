import type { Request, Response } from "express";
import { playerService } from "../services/playerService";
import { omitUndefined } from "../utils/object";

// Validation handled by middleware (see routes)

export const playersController = {
  create(req: Request, res: Response) {
    const name = (req as any).validatedBody?.name ?? req.body?.name;
    const player = playerService.createPlayer(name);
    res.status(201).json(player);
  },

  get(req: Request, res: Response) {
    const playerId = req.params.id as string;
    const player = playerService.getPlayer(playerId);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  },

  update(req: Request, res: Response) {
    const playerId = req.params.id as string;
    const cleaned = omitUndefined(req.body ?? {});
    const updated = playerService.updatePlayer(playerId, cleaned as any);
    if (!updated) return res.status(404).json({ message: "Player not found" });
    res.json(updated);
  },

  inventory(req: Request, res: Response) {
    const playerId = req.params.id as string;
    const player = playerService.getPlayer(playerId);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player.inventory);
  },

  deleteInventoryItem(req: Request, res: Response) {
    const playerId = req.params.id as string;
    const player = playerService.getPlayer(playerId);
    if (!player) return res.status(404).json({ message: "Player not found" });
    const qty = Number(req.query.quantity ?? 1);
    const itemId = req.params.itemId as string;
    const ok = playerService.removeFromInventory(playerId, itemId, qty);
    if (!ok) return res.status(400).json({ message: "Cannot delete item" });
    res.status(204).send();
  },
};



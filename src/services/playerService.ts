import { v4 as uuidv4 } from "uuid";
import { Player, PlayerSkills, InventoryItem } from "../models/types";
import { playersRepository } from "../repositories/playersRepository";

export const playerService = {
  createPlayer(name: string): Player {
    const id = uuidv4();
    const skills: PlayerSkills = { mining: 1, woodcutting: 1, crafting: 1 };
    const player: Player = {
      id,
      name,
      level: 1,
      experience: 0,
      skills,
      inventory: [],
      createdAt: new Date(),
    };
    return playersRepository.create(player);
  },

  getPlayer(id: string): Player | undefined {
    return playersRepository.getById(id);
  },

  updatePlayer(id: string, data: Partial<Omit<Player, "id" | "createdAt">>): Player | undefined {
    return playersRepository.update(id, data as Partial<Player>);
  },

  addToInventory(id: string, itemId: string, name: string, quantity: number): Player | undefined {
    const player = playersRepository.getById(id);
    if (!player) return undefined;
    const existing = player.inventory.find((i) => i.itemId === itemId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      const newItem: InventoryItem = { itemId, name, quantity };
      player.inventory.push(newItem);
    }
    return playersRepository.update(id, { inventory: player.inventory });
  },

  removeFromInventory(id: string, itemId: string, quantity: number): boolean {
    const player = playersRepository.getById(id);
    if (!player) return false;
    const item = player.inventory.find((i) => i.itemId === itemId);
    if (!item || item.quantity < quantity) return false;
    item.quantity -= quantity;
    if (item.quantity === 0) {
      player.inventory = player.inventory.filter((i) => i.itemId !== itemId);
    }
    playersRepository.update(id, { inventory: player.inventory });
    return true;
  },
};



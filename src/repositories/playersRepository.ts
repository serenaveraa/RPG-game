import { Player } from "../models/types";

const players = new Map<string, Player>();

export const playersRepository = {
  create(player: Player): Player {
    players.set(player.id, player);
    return player;
  },
  getById(id: string): Player | undefined {
    return players.get(id);
  },
  update(id: string, update: Partial<Player>): Player | undefined {
    const current = players.get(id);
    if (!current) return undefined;
    const merged: Player = { ...current, ...update } as Player;
    players.set(id, merged);
    return merged;
  },
  all(): Player[] {
    return Array.from(players.values());
  },
  clear(): void {
    players.clear();
  },
};



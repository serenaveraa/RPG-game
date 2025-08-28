import { RESOURCE_LOCATIONS } from "../utils/data";
import { playerService } from "./playerService";

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const gatherService = {
  listLocations() {
    return RESOURCE_LOCATIONS.map((l) => ({ id: l.id, location: l.location, skill: l.skill }));
  },

  performGather(playerId: string, locationId: string) {
    const node = RESOURCE_LOCATIONS.find((l) => l.id === locationId);
    if (!node) {
      return { ok: false as const, error: "Ubicación inválida" };
    }
    const player = playerService.getPlayer(playerId);
    if (!player) {
      return { ok: false as const, error: "Jugador no encontrado" };
    }
    // Probability per drop
    const drops: { itemId: string; name: string; quantity: number }[] = [];
    for (const drop of node.drops) {
      if (Math.random() < drop.chance) {
        drops.push({ itemId: drop.itemId, name: drop.name, quantity: getRandomInt(drop.min, drop.max) });
      }
    }
    // If nothing dropped, still small chance to get 1 common item
    if (drops.length === 0) {
      const fallback = node.drops[0];
      if (fallback) {
        drops.push({ itemId: fallback.itemId, name: fallback.name, quantity: 1 });
      }
    }

    // Grant items and XP
    for (const d of drops) {
      playerService.addToInventory(playerId, d.itemId, d.name, d.quantity);
    }
    const xpGain = 5 + drops.reduce((acc, d) => acc + d.quantity, 0);
    const newXp = player.experience + xpGain;
    let newLevel = player.level;
    while (newXp >= newLevel * 100) {
      newLevel += 1;
    }
    const updated = playerService.updatePlayer(playerId, {
      experience: newXp,
      level: newLevel,
      skills: { ...player.skills, [node.skill]: player.skills[node.skill] + 1 },
    });

    return {
      ok: true as const,
      drops,
      experienceGain: xpGain,
      player: updated!,
    };
  },
};



import { RECIPES, ITEMS } from "../utils/data";
import { playerService } from "./playerService";
import { Recipe } from "../models/types";

function hasMaterials(inventory: { itemId: string; quantity: number }[], materials: { itemId: string; quantity: number }[]) {
  return materials.every((m) => (inventory.find((i) => i.itemId === m.itemId)?.quantity ?? 0) >= m.quantity);
}

export const craftingService = {
  listRecipes(): Recipe[] {
    return RECIPES;
  },

  learnableRecipes(playerId: string): Recipe[] {
    // For MVP: all recipes are learnable; could filter by skills/level later
    return RECIPES;
  },

  craft(playerId: string, recipeId: string) {
    const player = playerService.getPlayer(playerId);
    if (!player) return { ok: false as const, error: "Jugador no encontrado" };
    const recipe = RECIPES.find((r) => r.id === recipeId);
    if (!recipe) return { ok: false as const, error: "Receta inválida" };
    if (!hasMaterials(player.inventory, recipe.materials)) {
      return { ok: false as const, error: "Materiales insuficientes" };
    }
    // consume materials
    for (const m of recipe.materials) {
      playerService.removeFromInventory(playerId, m.itemId, m.quantity);
    }
    // add result
    const resultName = Object.values(ITEMS).find((i) => i.id === recipe.result.itemId)?.name ?? recipe.result.itemId;
    playerService.addToInventory(playerId, recipe.result.itemId, resultName, recipe.result.quantity);
    const newXp = player.experience + recipe.experienceGain;
    let newLevel = player.level;
    while (newXp >= newLevel * 100) newLevel += 1;
    const updated = playerService.updatePlayer(playerId, {
      experience: newXp,
      level: newLevel,
      skills: { ...player.skills, crafting: player.skills.crafting + 1 },
    });
    return { ok: true as const, result: recipe.result, experienceGain: recipe.experienceGain, player: updated! };
  },
};



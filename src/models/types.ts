export interface InventoryItem {
  itemId: string;
  name: string;
  quantity: number;
}

export interface PlayerSkills {
  mining: number;
  woodcutting: number;
  crafting: number;
}

export interface Player {
  id: string;
  name: string;
  level: number;
  experience: number;
  skills: PlayerSkills;
  inventory: InventoryItem[];
  createdAt: Date;
}

export type LocationType = "forest" | "mine" | "quarry";

export interface ResourceNode {
  id: string;
  location: LocationType;
  skill: keyof PlayerSkills;
  drops: { itemId: string; name: string; min: number; max: number; chance: number }[];
}

export interface RecipeMaterialRequirement {
  itemId: string;
  quantity: number;
}

export interface RecipeResult {
  itemId: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  materials: RecipeMaterialRequirement[];
  result: RecipeResult;
  experienceGain: number;
}

export interface ApiErrorBody {
  message: string;
  details?: unknown;
}



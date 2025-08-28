import { LocationType, Recipe, ResourceNode } from "../models/types";

export const ITEMS = {
  OAK_WOOD: { id: "oak_wood", name: "Madera de Roble" },
  PINE_WOOD: { id: "pine_wood", name: "Madera de Pino" },
  RARE_MAPLE: { id: "rare_maple", name: "Arce Raro" },
  IRON_ORE: { id: "iron_ore", name: "Mineral de Hierro" },
  COPPER_ORE: { id: "copper_ore", name: "Mineral de Cobre" },
  RARE_GEM: { id: "rare_gem", name: "Gema Rara" },
  STONE: { id: "stone", name: "Piedra" },
  MARBLE: { id: "marble", name: "Mármol" },
  CRYSTAL: { id: "crystal", name: "Cristal" },
  WOODEN_SWORD: { id: "wooden_sword", name: "Espada de Madera" },
  IRON_HELMET: { id: "iron_helmet", name: "Casco de Hierro" },
  MAGIC_RING: { id: "magic_ring", name: "Anillo Mágico" },
} as const;

export const RESOURCE_LOCATIONS: ResourceNode[] = [
  {
    id: "forest",
    location: "forest",
    skill: "woodcutting",
    drops: [
      { itemId: ITEMS.OAK_WOOD.id, name: ITEMS.OAK_WOOD.name, min: 1, max: 3, chance: 0.9 },
      { itemId: ITEMS.PINE_WOOD.id, name: ITEMS.PINE_WOOD.name, min: 1, max: 2, chance: 0.6 },
      { itemId: ITEMS.RARE_MAPLE.id, name: ITEMS.RARE_MAPLE.name, min: 1, max: 1, chance: 0.1 },
    ],
  },
  {
    id: "mine",
    location: "mine",
    skill: "mining",
    drops: [
      { itemId: ITEMS.IRON_ORE.id, name: ITEMS.IRON_ORE.name, min: 1, max: 3, chance: 0.8 },
      { itemId: ITEMS.COPPER_ORE.id, name: ITEMS.COPPER_ORE.name, min: 1, max: 3, chance: 0.7 },
      { itemId: ITEMS.RARE_GEM.id, name: ITEMS.RARE_GEM.name, min: 1, max: 1, chance: 0.05 },
    ],
  },
  {
    id: "quarry",
    location: "quarry",
    skill: "mining",
    drops: [
      { itemId: ITEMS.STONE.id, name: ITEMS.STONE.name, min: 1, max: 4, chance: 0.9 },
      { itemId: ITEMS.MARBLE.id, name: ITEMS.MARBLE.name, min: 1, max: 2, chance: 0.4 },
      { itemId: ITEMS.CRYSTAL.id, name: ITEMS.CRYSTAL.name, min: 1, max: 1, chance: 0.12 },
    ],
  },
];

export const RECIPES: Recipe[] = [
  {
    id: "wooden_sword",
    name: "Espada de Madera",
    materials: [{ itemId: ITEMS.OAK_WOOD.id, quantity: 5 }],
    result: { itemId: ITEMS.WOODEN_SWORD.id, quantity: 1 },
    experienceGain: 10,
  },
  {
    id: "iron_helmet",
    name: "Casco de Hierro",
    materials: [
      { itemId: ITEMS.IRON_ORE.id, quantity: 3 },
      { itemId: ITEMS.STONE.id, quantity: 1 },
    ],
    result: { itemId: ITEMS.IRON_HELMET.id, quantity: 1 },
    experienceGain: 20,
  },
  {
    id: "magic_ring",
    name: "Anillo Mágico",
    materials: [
      { itemId: ITEMS.RARE_GEM.id, quantity: 1 },
      { itemId: ITEMS.COPPER_ORE.id, quantity: 2 },
    ],
    result: { itemId: ITEMS.MAGIC_RING.id, quantity: 1 },
    experienceGain: 50,
  },
];

export const LOCATION_LABELS: Record<LocationType, string> = {
  forest: "Bosque",
  mine: "Mina",
  quarry: "Cantera",
};



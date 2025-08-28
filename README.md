## 🛡️ RPG Crafting API (Express + TypeScript)

Welcome to the backend of a cozy crafting-focused RPG! ✨

### 🎮 Game Concept
- Explore gathering locations to collect resources: 🌲 Forest, ⛏️ Mine, 🧱 Quarry
- Learn and use recipes to craft items 🛠️
- Manage your inventory 🎒
- Level up by gaining experience ⭐ and improve your skills: Mining, Woodcutting, Crafting

This API powers those mechanics with clean REST endpoints, TypeScript types, in-memory storage, and input validation.

### 🔧 Requirements
- Node.js 18+
- npm 9+

### 📦 Installation
```bash
npm install
```

### 🏃 Scripts
```bash
# Compile TypeScript
npm run build

# Development server (auto-reload)
npm run dev

# Run compiled server
npm start

# Tests (Jest + Supertest)
npm test
```

The server runs at `http://localhost:3000` and all endpoints are prefixed with `/api`.

Base URL: `http://localhost:3000/api`

### 🧩 Core Models (TypeScript)
- `Player`: id, name, level, experience, skills { mining, woodcutting, crafting }, inventory, createdAt
- `InventoryItem`: itemId, name, quantity
- `Recipe`: id, name, materials[], result, experienceGain
- Gathering locations: forest, mine, quarry (see `src/utils/data.ts`)

### 💾 Storage
In-memory `Map` (non-persistent). Repository: `src/repositories/playersRepository.ts`.

### 🧰 Validation and Errors
- Input validation with Zod in controllers
- Simple error middleware in `src/middleware/errorHandler.ts`

### 📚 API Endpoints

Base URL: `http://localhost:3000/api`

- 👤 Players
  - POST `/api/players` — Create a new player
    - Body: `{ "name": string }`
    - 201: Player
  - GET `/api/players/:id` — Get player
    - 200: Player | 404 if not found
  - PUT `/api/players/:id` — Update player stats
    - Optional body: `{ level?: number, experience?: number, skills?: { mining: number; woodcutting: number; crafting: number } }`
    - 200: Player | 400 invalid data | 404 if not found

- 🎒 Inventory
  - GET `/api/players/:id/inventory` — View inventory
    - 200: `InventoryItem[]`
  - DELETE `/api/players/:id/inventory/:itemId?quantity=1` — Discard items
    - Query: `quantity` (optional, default 1)
    - 204 no content | 400 if not applicable | 404 if player not found

- ⛏️ Gathering
  - GET `/api/locations` — List locations
    - 200: `[ { id: "forest"|"mine"|"quarry", location, skill } ]`
  - POST `/api/players/:id/gather` — Gather resources
    - Body: `{ "locationId": "forest" | "mine" | "quarry" }`
    - 200: `{ ok: true, drops: {itemId,name,quantity}[], experienceGain, player }`
    - 400: invalid location | player not found

- 🛠️ Crafting
  - GET `/api/recipes` — List recipes
    - 200: `Recipe[]`
  - GET `/api/players/:id/recipes` — Learnable recipes (MVP: all)
    - 200: `Recipe[]`
  - POST `/api/players/:id/craft` — Craft
    - Body: `{ "recipeId": string }`
    - 200: `{ ok: true, result, experienceGain, player }`
    - 400: insufficient materials | invalid recipe | player not found

### 📜 Included Recipes (examples)
- Wooden Sword: `5 × Oak Wood` → `Wooden Sword` (+10 XP)
- Iron Helmet: `3 × Iron Ore + 1 × Stone` → `Iron Helmet` (+20 XP)
- Magic Ring: `1 × Rare Gem + 2 × Copper Ore` → `Magic Ring` (+50 XP)

### 🧪 Quick examples (curl)
```bash
# Create player
curl -s -X POST http://localhost:3000/api/players \
  -H "Content-Type: application/json" \
  -d '{"name":"Karina"}'

# Gather in Forest
curl -s -X POST http://localhost:3000/api/players/PLAYER_ID/gather \
  -H "Content-Type: application/json" \
  -d '{"locationId":"forest"}'

# List recipes
curl -s http://localhost:3000/api/recipes

# Craft wooden sword
curl -s -X POST http://localhost:3000/api/players/PLAYER_ID/craft \
  -H "Content-Type: application/json" \
  -d '{"recipeId":"wooden_sword"}'
```

### ✅ Testing (Jest + Supertest)
- Tests in `src/__tests__/app.test.ts`
- Run: `npm test`

### 📬 Postman
- Import `postman_collection.json`
- Useful variables: `playerId`, `itemId`

### 🗒️ Notes
- This project uses in-memory storage: restarting the server resets the state.
- XP/leveling is simple: level increases every `level * 100` XP.



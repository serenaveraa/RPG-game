import request from "supertest";
import app from "../src/index";

describe("RPG API", () => {
  let playerId: string;

  it("creates a new player", async () => {
    const res = await request(app).post("/api/players").send({ name: "Tester" });
    expect(res.status).toBe(201);
    playerId = res.body.id;
  });

  it("returns player data", async () => {
    const res = await request(app).get(`/api/players/${playerId}`);
    expect(res.status).toBe(200);
  });

  it("lists locations and performs gather", async () => {
    const locs = await request(app).get("/api/locations");
    expect(locs.status).toBe(200);
    const gatherRes = await request(app).post(`/api/players/${playerId}/gather`).send({ locationId: "forest" });
    expect(gatherRes.status).toBe(200);
  });

  it("lists recipes", async () => {
    const res = await request(app).get("/api/recipes");
    expect(res.status).toBe(200);
  });

  it("fails crafting without materials then crafts after gathering", async () => {
    const craftFail = await request(app).post(`/api/players/${playerId}/craft`).send({ recipeId: "wooden_sword" });
    expect(craftFail.status).toBe(400);
    let crafted = false;
    for (let i = 0; i < 20 && !crafted; i++) {
      await request(app).post(`/api/players/${playerId}/gather`).send({ locationId: "forest" });
      const attempt = await request(app).post(`/api/players/${playerId}/craft`).send({ recipeId: "wooden_sword" });
      if (attempt.status === 200) crafted = true;
    }
    expect(crafted).toBe(true);
  });
});



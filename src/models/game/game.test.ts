import { Terrain } from "./game"

describe("Game", ()=> {
    it("Basic", ()=> {
        const terrain = new Terrain({x: 10, y:-20})
        expect(terrain.travelDistance()).toBe(0)
        terrain.step(3, 45)
        expect(terrain.travelDistance()).toBe(3)
        terrain.step(3, 225)
        expect(terrain.travelDistance()).toBe(6)
        expect(terrain.vectorDistanceFromStart()).toBe(0)
    })
    it("3-4-5", ()=> {
        const terrain = new Terrain({x: 10, y:-20})
        expect(terrain.travelDistance()).toBe(0)
        terrain.step(3, 0)
        expect(terrain.travelDistance()).toBe(3)
        terrain.step(4, 90)
        expect(terrain.travelDistance()).toBe(7)
        expect(terrain.vectorDistanceFromStart()).toBe(5)
    })
})


export {}
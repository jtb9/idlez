import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage(() => sessionStorage)
export const gameAtom = atomWithStorage('game-state-z5', {
    scene: 'splash',
    credits: 0,
    popularity: 1,
    shipCount: 1,
    hullSize: 1,
    stationLevel: 1,
    routesLevel: 1,
    engineLevel: 1
}, storage)

export const switchScene = (newScene: string, set: any) => {
    set((data: any) => {
        let newData = {
            ...data
        }

        newData.scene = newScene;

        return newData;
    });
}

export const addCredits = (creditsToAdd: any, set: any) => {
    set((data: any) => {
        let newData = {
            ...data
        }

        newData.credits += creditsToAdd;

        return newData;
    });
}

import { Stack, Button } from "@mui/material";
import { useAtom } from "jotai";
import { addCredits, gameAtom } from "../State/GameState";

function calculateCost(baseCost: number, level: number, perLevel: number) {
    return baseCost + (level * perLevel)
}

export default function Upgardes() {

    const [game, setGame] = useAtom<any>(gameAtom);

    const buttonWithCost = (label: string, cost: number, callback: any) => {
        const canAfford = game.credits >= cost;

        return <Button disabled={!canAfford} onClick={() => {
            addCredits(-cost, setGame);
            callback();
        }} variant="contained">{label} ({cost} credits)</Button>
    }

    return <Stack sx={{width: '300px'}} direction="column">
        {buttonWithCost("Buy Ship", calculateCost(100, game.shipCount, 100), () => {
            setGame((g: any) => {
                return {
                    ...g,
                    shipCount: g.shipCount + 1
                }
            })
        })}
        {buttonWithCost("Hull Size", calculateCost(1000, game.hullSize, 1000), () => {
            setGame((g: any) => {
                return {
                    ...g,
                    hullSize: g.hullSize + 1
                }
            })
        })}
        {buttonWithCost("Buy Engines", calculateCost(10000, game.engineLevel, 10000), () => {
            setGame((g: any) => {
                return {
                    ...g,
                    hullSize: g.engineLevel + 1
                }
            })
        })}
        {buttonWithCost("Upgrade Station", calculateCost(100000, game.stationLevel, 100000), () => {
            setGame((g: any) => {
                return {
                    ...g,
                    hullSize: g.stationLevel + 1
                }
            })
        })}
        {buttonWithCost("Upgrade Routes", calculateCost(1000000, game.routesLevel, 1000000), () => {
            setGame((g: any) => {
                return {
                    ...g,
                    hullSize: g.routesLevel + 1
                }
            })
        })}
    </Stack>
}

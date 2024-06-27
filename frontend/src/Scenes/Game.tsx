import { Button, Stack, Typography } from "@mui/material";
import Backdrop from "../Components/Backdrop";
import { useAtom } from "jotai";
import { addCredits, gameAtom } from "../State/GameState";
import { useState } from "react";
import Windowz from "../Components/Windowz";
import Upgardes from "../Features/Upgardes";
import { Scout } from "../Features/Scout";
import CurrencyMarker from "../Components/CurrencyMarker";
import { useInterval } from "usehooks-ts";

export default function Game() {
    const [game, setGame] = useAtom<any>(gameAtom);
    let [currencyMarkers, setCurrencyMarks] = useState<any>([]);
    const [showingUpgrades, setShowingUpgrades] = useState(false);
    const [showingScouting, setShowingScouting] = useState(false);
    const [intervalRange, setIntervalRange] = useState({ min: 1000, max: 5000 });

    const getRandomInterval = () => {
        let calculatedMin = intervalRange.min;
        let calculatedMax = intervalRange.max;

        calculatedMax -= 10 * game.engineLevel;
        calculatedMin -= 10 * game.engineLevel;

        return Math.floor(Math.random() * (calculatedMax - calculatedMin + 1)) + calculatedMin;
    }

    useInterval(
        () => {
            const seedNewCurrency = (Math.floor(Math.random() * (10)) + 1) * game.shipCount * game.hullSize;
            addCredits(seedNewCurrency, setGame);
            let newCurrencyMarkers = currencyMarkers;

            newCurrencyMarkers.push([Date.now(), seedNewCurrency]);
    
            if (newCurrencyMarkers.length >= 10) {
                newCurrencyMarkers.shift();
            }
    
            setCurrencyMarks(newCurrencyMarkers);
        },
        // Delay in milliseconds or null to stop it
        getRandomInterval(),
    )

    const renderCurrency = () => {
        return <Stack className="panel" sx={{ position: 'relative', top: '10px', left: '10px', width: '300px' }}>
            <div className="panel-inner">
                <Typography fontSize="1.2rem">Credits: {game.credits}</Typography>
            </div>
        </Stack>
    }

    const renderPopularity = () => {
        return <Stack className="panel" sx={{ position: 'relative', top: '20px', left: '10px', width: '300px' }}>
            <div className="panel-inner">
                <Typography fontSize="1.2rem">Popularity: {game.popularity}</Typography>
            </div>
        </Stack>
    }

    const renderGUIControls = () => {
        return <>
            <Windowz startingX={200} startingY={500} onClose={(() => {
                setShowingScouting(false);
            })} open={showingScouting} title="Scouting">
                <Scout onDone={() => {
                    setShowingScouting(false);
                }} />
            </Windowz>
            <Windowz startingX={200} startingY={200} onClose={(() => {
                setShowingUpgrades(false);
            })} open={showingUpgrades} title="Upgardes">
                <Upgardes />
            </Windowz>
            <Stack direction="column" spacing={2} sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                <Button disabled={showingUpgrades} onClick={() => {
                    setShowingUpgrades(true);
                }} variant='contained'>Upgrades</Button>

                <Button disabled={showingScouting} onClick={() => {
                    setShowingScouting(true);
                }} variant='contained'>Scouting</Button>

                <Button onClick={() => {
                }} variant='contained'>Missions</Button>

                <Button onClick={() => {
                }} variant='contained'>Station</Button>


            </Stack>
        </>
    }

    const renderCurrencyMarkers = () => {
        let entries = [];

        for (let i = 0; i < currencyMarkers.length; i++) {
            entries.push(<CurrencyMarker currency={currencyMarkers[i][1]} startTime={currencyMarkers[i][0]} />)
        }

        return <>
            {entries}
        </>
    }

    return <>
        <Stack sx={{ height: '100vh', width: '100vw', zIndex: '10', position: 'absolute', top: '0px', left: '0px' }}>
            {renderCurrency()}
            {renderPopularity()}
            {renderGUIControls()}
            {renderCurrencyMarkers()}
        </Stack>
        <Backdrop />
    </>
}

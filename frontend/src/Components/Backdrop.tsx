import { useAtom } from "jotai";
import { Unity, useUnityContext } from "react-unity-webgl";
import { gameAtom } from "../State/GameState";
import { useEffect } from "react";
import { CircularProgress, LinearProgress, Stack } from "@mui/material";

export default function Backdrop() {
    const [game, setGame] = useAtom<any>(gameAtom);

    const { unityProvider, sendMessage, isLoaded } = useUnityContext({
        loaderUrl: "Build/idlez.loader.js",
        dataUrl: "Build/idlez.data",
        frameworkUrl: "Build/idlez.framework.js",
        codeUrl: "Build/idlez.wasm",
    });

    useEffect(() => {
        if (isLoaded) {
            sendMessage("Home", "SetTarget", game.shipCount);
        }
    }, [isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            sendMessage("Home", "SetTarget", game.shipCount);
        }
    }, [game.shipCount, isLoaded])

    return <>
        {isLoaded ? undefined : <Stack justifyContent="center" direction="column">
            <Stack justifyContent="center" direction="row">
                <LinearProgress />
            </Stack>
        </Stack>}
        <Unity style={{ position: 'absolute', top: '0px', left: '0px', width: '100vw', height: '100vh', zIndex: '1' }} unityProvider={unityProvider} />
    </>
}

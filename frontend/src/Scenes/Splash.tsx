import { Button, Stack } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";
import { SButton } from "../Components/SButton";
import Backdrop from "../Components/Backdrop";
import { useAtom } from "jotai";
import { gameAtom, switchScene } from "../State/GameState";

export default function Splash() {
    const [game, setGame] = useAtom<any>(gameAtom);
    
    return <>
        <Stack sx={{height: '100vh', width: '100vw', zIndex: '10', position: 'absolute', top: '0px', left: '0px'}} direction="column" justifyContent="center" alignContent={"center"}>
            <Stack direction="row" justifyContent="center">
                <Button onClick={() => {
                    switchScene("game", setGame);
                }} sx={{width: '300px', height: '300px', fontSize: '100px'}} variant="outlined">Initialize</Button>
            </Stack>
        </Stack>
        <Backdrop />
    </>
}

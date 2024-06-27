import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";

interface Props {
    onDone: any
}

export function Scout(props: Props) {
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setIsComplete(true);
        }
    }, [timeLeft]);

    const percentage = ((120 - timeLeft) / 120) * 100;

    const renderView = () => {
        if (percentage >= 100) {
            return <>
                <Typography>You recieved nothing</Typography>
                <Button onClick={() => {
                    props.onDone();
                }} variant="contained">Done</Button>
            </>
        }

        return <>
            <Typography>Please wait while the scouting mission takes place</Typography>
            <Stack direction="row" justifyContent="center"><CircularProgress variant="determinate" value={percentage} /></Stack>
        </>
    }

    return <Stack>
        {renderView()}
    </Stack>
}

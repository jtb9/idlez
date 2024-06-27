import { Typography } from "@mui/material";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

interface Props {
    currency: number;
    startTime: number;
}
export default function CurrencyMarker(props: Props) {
    const [opacity, setOpacity] = useState(1.0);

    useInterval(
        () => {
            const elapsedTime = Date.now() - props.startTime;
            const duration = 1000; // duration in milliseconds
          
            // Calculate the scaling factor
            let scaledValue = 1.0 - (elapsedTime / duration);
          
            // Clamp the value between 0.0 and 1.0
            scaledValue = Math.max(0, Math.min(1, scaledValue));

            setOpacity(scaledValue);
        },
        // Delay in milliseconds or null to stop it
        50,
      )

    return <Typography sx={{
        opacity: opacity,
        position: 'absolute',
        top: `${30 + opacity * 10.0}px`,
        left: '350px',
        fontSize: '2.0rem'
    }} color="white">+{props.currency}</Typography>
}

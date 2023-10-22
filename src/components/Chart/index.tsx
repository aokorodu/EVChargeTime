import { useEffect, useState } from "react";

type ChartProps = {
    timeNotFull: number,
    rangeNotFull: number,
    stopsNotFull: number,
    timePerChargeNotFull: number,
    timeFull: number,
    rangeFull: number,
    timePerChargeFull: number,
    distance: number;
}
const Chart = ({ timeNotFull, timeFull, stopsNotFull, timePerChargeNotFull, rangeNotFull, rangeFull, timePerChargeFull, distance }: ChartProps) => {

    useEffect(() => {
        setLoaded(true)
    }, []);

    const [loaded, setLoaded] = useState(false);
    const maxTime = timeFull >= timeNotFull ? timeFull : timeNotFull;
    const unitsPerMin = 250 / maxTime;
    const yNotFull = 250 - timeNotFull * unitsPerMin;
    const yFull = 250 - timeFull * unitsPerMin;

    const unitsPerMile = 500 / distance;


    const getNotFullLines = () => {
        const notFullIncrements = rangeNotFull * unitsPerMile;
        const arr = [];
        for (let i = 0; i < stopsNotFull; i++) {
            const xpos = (i + 1) * notFullIncrements;
            const ypos = 250 - ((i + 1) * timePerChargeNotFull) * unitsPerMin;
            arr.push(<circle key={`${i}_circle_nofull`} cx={xpos} cy={ypos} fill="blue" r={3} />)
            arr.push(<path key={`${i}_path_nofull`} d={`M${xpos},250 L${xpos},${ypos}`}
                stroke="blue" strokeOpacity={.2} />)
        }

        return arr;
    }

    const getFullLines = () => {
        const fullIncrements = rangeFull * unitsPerMile;
        const arr = [];
        for (let i = 0; i < stopsNotFull; i++) {
            const xpos = (i + 1) * fullIncrements;
            const ypos = 250 - ((i + 1) * Math.round(timePerChargeFull)) * unitsPerMin;
            arr.push(<circle key={`${i}_circle_full`} cx={xpos} cy={ypos} fill="red" r={3} />)
            arr.push(<path key={`${i}_path_full`} d={`M${xpos},250 L${xpos},${ypos}`}
                stroke="red" strokeOpacity={.2} />)
        }

        return arr;
    }

    const drawChart = () => {
        return (
            <svg viewBox="0 0 500 290">
                <rect x="0" y="0" width="499" height="249" fill="#fafafa" />
                <path d={`M0,250 L500,${yFull}`} fill="none" stroke="red" />
                <path d={`M0,250 L500,${yNotFull}`} fill="none" stroke="blue" />
                <path d="M0,249 H500" stroke="#c6c6c6" strokeWidth={4} />
                <circle cx="0" cy="250" r="5" fill="black" />
                {getNotFullLines()}
                {getFullLines()}
                <g transform="translate(25, 0)">
                    <line x1="30" y1="39.5" x2="84" y2="39.5" stroke="#F70B0B" strokeWidth="3" />
                    <line x1="30" y1="60.5" x2="84" y2="60.5" stroke="#1E0BF7" strokeWidth="3" />
                    <text fill="black" fontSize="11" letterSpacing="-0.015em"><tspan x="89" y="40.685">100%</tspan></text>
                    <text fill="black" fontSize="11" letterSpacing="-0.015em"><tspan x="91" y="61.685">80%</tspan></text>
                    <text fill="black" fontSize="11" letterSpacing="-0.015em"><tspan x="91" y="82.685">charging stop</tspan></text>
                    <line x1="30" y1="81.5" x2="84" y2="81.5" stroke="black" strokeWidth="3" />
                    <circle cx="57" cy="82" r="5" fill="black" />
                </g>
                <text x="250" y="255" fill="black" textAnchor={"middle"} dominantBaseline={"hanging"} letter-spacing="2">DISTANCE</text>
                <text x="5" y="125" fill="black" textAnchor={"middle"} dominantBaseline={"auto"} transform="rotate(90 5 125)" letter-spacing="2">TIME</text>
            </svg>
        )
    }

    return (
        <>
            {loaded && drawChart()}
        </>
    );
}

export default Chart
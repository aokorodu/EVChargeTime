type ChartProps = {
    timeNotFull: number,
    rangeNotFull: number,
    stopsNotFull: number,
    timePerChargeNotFull: number,
    timeFull: number,
    rangeFull: number,
    stopsFull: number,
    timePerChargeFull: number,
    distance: number;
}
const Chart = ({ timeNotFull, timeFull, stopsNotFull, timePerChargeNotFull, stopsFull, rangeNotFull, rangeFull, timePerChargeFull, distance }: ChartProps) => {

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
            arr.push(<circle cx={xpos} cy={ypos} fill="blue" r={3} />)
            arr.push(<path d={`M${xpos},250 L${xpos},${ypos}`}
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
            arr.push(<circle cx={xpos} cy={ypos} fill="red" r={3} />)
            arr.push(<path d={`M${xpos},250 L${xpos},${ypos}`}
                stroke="red" strokeOpacity={.2} />)
        }

        return arr;
    }

    return (
        <svg viewBox="0 0 500 250">
            <rect x="0" y="0" width="500" height="250" fill="#eaeaea" />
            <path d="M1,0 L1,249 499,249" fill="none" stroke="black" />
            <path d={`M0,250 L500,${yFull}`} fill="none" stroke="red" />
            <path d={`M0,250 L500,${yNotFull}`} fill="none" stroke="blue" />
            <circle cx="1" cy="249" r="5" fill="black" />
            {getNotFullLines()}
            {getFullLines()}
        </svg>
    );
}

export default Chart
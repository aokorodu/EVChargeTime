type ChartProps = {
    timeNotFull: number,
    rangeNotFull: number,
    stopsNotFull: number,
    timeFull: number,
    rangeFull: number,
    stopsFull: number,
    distance: number;
}
const Chart = ({ timeNotFull, timeFull, stopsNotFull, stopsFull, rangeNotFull, rangeFull, distance }: ChartProps) => {

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
            arr.push(<path d={`M${xpos},250 v-250`} stroke="blue" strokeOpacity={.05} strokeWidth={1} />)
        }

        return arr;
    }

    const getNotLines = () => {
        const fullIncrements = rangeFull * unitsPerMile;
        const arr = [];
        for (let i = 0; i < stopsNotFull; i++) {
            const xpos = (i + 1) * fullIncrements;
            arr.push(<path d={`M${xpos},250 v-250`} stroke="red" strokeOpacity={.05} strokeWidth={1} />)
        }

        return arr;
    }

    return (
        <svg viewBox="0 0 500 250">
            <rect x="0" y="0" width="500" height="250" fill="#eaeaea" />
            <path d="M1,0 L1,249 499,249" fill="none" stroke="black" />
            <path d={`M0,250 L500,${yFull}`} fill="none" stroke="red" />
            <path d={`M0,250 L500,${yNotFull}`} fill="none" stroke="blue" />
            {getNotFullLines()}
            {getNotLines()}
        </svg>
    );
}

export default Chart
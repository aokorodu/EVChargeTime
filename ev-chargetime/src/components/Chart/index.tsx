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
    const unitsPerMin = 500 / maxTime;
    const yNotFull = 500 - timeNotFull * unitsPerMin;
    const yFull = 500 - timeFull * unitsPerMin;
    console.log('timeFull: ', timeFull)
    console.log('timeNotFull: ', timeNotFull)
    console.log('yfull: ', yFull)
    console.log('yNotFull: ', yNotFull)

    return (
        <svg viewBox="0 0 500 500">
            <rect x="0" y="0" width="500" height="500" fill="#eaeaea" />
            <path d="M1,0 L1,499 499,499" fill="none" stroke="black" />
            <path d={`M0,500 L500,${yFull}`} fill="none" stroke="red" />
            <path d={`M0,500 L500,${yNotFull}`} fill="none" stroke="blue" />
        </svg>
    );
}

export default Chart
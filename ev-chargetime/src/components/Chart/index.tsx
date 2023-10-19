type ChartProps = {
    time: number,
    distance: number;
}
const Chart = ({ time, distance }: ChartProps) => {

    const drawLines = () => {
        const p1 = {
            x: 0,
            y: 0
        }

        const p2 = {
            x: 500,
            y: 500
        }
    }
    return (
        <svg viewBox="0 0 500 500">
            <rect x="0" y="0" width="500" height="500" fill="blue" />
        </svg>
    );
}

export default Chart
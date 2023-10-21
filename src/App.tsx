import { useEffect, useState } from 'react';
import './App.css';
import Selector from './components/Selector';
import CustomSelector from './components/CustomSelector';
import Chart from './components/Chart';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const chargeCurve = [2.36, 2.07, 2.07, 2.07, 2.53, 2.85, 3.3, 18]
  const defaultRange: Number = 285;

  const [startcharge, setStartCharge] = useState(10);
  const [range, setRange] = useState(defaultRange);
  const [driveTime, setDriveTime] = useState(0);
  const [waitTime, setWaitTime] = useState(0);
  const [totalTimePerFull, setTotalTimePerFull] = useState(0);
  const [totalTimePerNotFull, setTotalTimePerNotFull] = useState(0);
  const [testDistance, setTestDistance] = useState(1000)

  useEffect(() => {
    recalculate();
  }, [startcharge, range, driveTime, waitTime, testDistance])


  const calculateTime = (endcharge: number) => {

    const chargeTime = getChargingTime(startcharge, endcharge);
    const totalTime = chargeTime + driveTime + waitTime;

    return totalTime;
  }

  const recalculate = () => {
    setTotalTimePerNotFull(calculateTime(80));
    setTotalTimePerFull(calculateTime(100))
  }
  const changeStart = (e: String) => {
    console.log('change start to ', e)
    const num = Number(e);
    setStartCharge(num);
  }

  const waitEnd = (e: Number) => {
    setWaitTime(Number(e))
  }

  const getChargingTime = (startcharge: number, endcharge: number): number => {
    const startIndex = (startcharge / 10) - 1;
    const endIndex = (endcharge / 10 - 2);
    let sum = 0;
    for (let i = startIndex; i <= endIndex; i++) {
      const current = chargeCurve[i];
      if (current) sum += current;
    }

    return sum;
  }

  const getNumberOfChargingSessions = (endcharge: number): number => {
    const dist = (endcharge - startcharge) / 100 * Number(range);
    const num = testDistance / dist;

    return num;
  }

  const getTotalTimeSpentChargingNumber = (endcharge: number): number => {
    const num = getNumberOfChargingSessions(endcharge);
    const totalTimePer = endcharge == 80 ? totalTimePerNotFull : totalTimePerFull;
    const totalMinutes = num * totalTimePer;

    return totalMinutes
  }

  const getTotalTimeSpentCharging = (endcharge: number): string => {

    const totalMinutes = getTotalTimeSpentChargingNumber(endcharge)
    const str = getTimeString(totalMinutes)
    return str;
  }

  const getTimeString = (min: number): string => {
    const hours = Math.floor(min / 60);
    let minutes = String(Math.round(min) % 60);
    if (minutes.length == 1) minutes = `0${minutes}`;
    const str = `${hours}:${minutes}`;

    return str;
  }

  const getChartData = () => {
    const obj = {
      timeNotFull: getTotalTimeSpentChargingNumber(80),
      rangeNotFull: getRange(80),
      stopsNotFull: getNumberOfChargingSessions(80),
      timePerChargeNotFull: totalTimePerNotFull,
      timeFull: getTotalTimeSpentChargingNumber(100),
      rangeFull: getRange(100),
      stopsFull: getNumberOfChargingSessions(100),
      timePerChargeFull: totalTimePerFull,
      distance: testDistance
    }

    return obj;
  }

  const getRange = (charge: number) => {
    return (charge - startcharge) / 100 * Number(range)
  }

  const getTimeMenuItems = () => {
    const num = 13;
    const arr = [];
    for (let i = 0; i < num; i++) {
      const val = i * 5;
      arr.push(<MenuItem value={val}>{val}</MenuItem>)
    }

    return arr;
  }

  return (
    <>
      <div className='controls'>
        <div className='chargeLevelControls'>
          <CustomSelector label="Start Charge %" value={10} valueOptions={[10, 20, 30, 40, 50]} callback={changeStart} suffix='%' />
          <CustomSelector label="100% range:" value={280} valueOptions={[200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400]} callback={setRange} />
        </div>
        <div className='dynamicNumbers'>

          <div className='inputStuff'>

          </div>

          <div className='inputStuff'>
            <TextField fullWidth id="outlined-basic" label="Drive time to charger" variant="outlined"
              value={driveTime} InputProps={{
                endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
              }}
              onChange={(e) => { setDriveTime(Number(e.target.value)) }} />
          </div>

          <div className='inputStuff'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Average Wait time</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={waitTime}
                label="Average Wait time"
                onChange={(e) => { waitEnd(Number(e.target.value)) }}
              >
                {/* <MenuItem value={0}>0</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={60}>60</MenuItem> */}
                {getTimeMenuItems()}
              </Select>
            </FormControl>
          </div>



          <div className='inputStuff'>
            {/* Test Distance
            <input value={testDistance} onChange={(e) => { setTestDistance(Number(e.target.value)) }}></input> */}
            <TextField fullWidth id="outlined-basic" label="Test Distance" variant="outlined"
              value={testDistance}
              onChange={(e) => { setTestDistance(Number(e.target.value)) }} />
          </div>

        </div>



        <div className='resultNumbers'>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>80%</th>
                <th>100%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Range between start and end:</td>
                <td>{Math.round(getRange(80))}</td>
                <td>{Math.round(getRange(100))}</td>
              </tr>

              <tr>
                <td>Total non-charging time:</td>
                <td>{getTimeString(Math.round(driveTime + waitTime))}</td>
                <td>{getTimeString(Math.round(driveTime + waitTime))}</td>
              </tr>

              <tr>
                <td>Total charging time: </td>
                <td>{getTimeString(getChargingTime(startcharge, 80))}</td>
                <td>{getTimeString(getChargingTime(startcharge, 100))}</td>
              </tr>

              <tr>
                <td>Total time per charge: </td>
                <td>{getTimeString(totalTimePerNotFull)}</td>
                <td>{getTimeString(totalTimePerFull)}</td>
              </tr>

              <tr>
                <td># of charging stops:</td>
                <td>{Math.ceil(getNumberOfChargingSessions(80))}</td>
                <td>{Math.ceil(getNumberOfChargingSessions(100))}</td>
              </tr>

              <tr>
                <td>Total time spent charging</td>
                <td>{getTotalTimeSpentCharging(80)}</td>
                <td>{getTotalTimeSpentCharging(100)}</td>
              </tr>
            </tbody>
          </table>
          {/* <div className='dataStuff'>
            <div>Range between start and end:</div>
            <div>{Math.round((80 - startcharge) / 100 * Number(range))}</div>
            <div>{Math.round((100 - startcharge) / 100 * Number(range))}</div>
          </div> */}
          {/* <div className='dataStuff'>
            <div>Total non-charging time: </div>
            <div>{getTimeString(driveTime + waitTime)}</div>
          </div> */}
          {/* <div className='dataStuff'>
            <div>Total charging time: </div>
            <div>{getTimeString(getChargingTime(startcharge, 80))}</div>
            <div>{getTimeString(getChargingTime(startcharge, 100))}</div>
          </div> */}
          {/* <div className='dataStuff'>
            <div>Total time per charge: </div>
            <div>{getTimeString(totalTimePerNotFull)}</div>
            <div>{getTimeString(totalTimePerFull)}</div>
          </div> */}
          {/* <div className='dataStuff'>
            <div>Number of charging stops to cover test distance:</div>
            <div>{getNumberOfChargingSessions(80)}</div>
            <div>{getNumberOfChargingSessions(100)}</div>
          </div> */}

        </div>

        {/* <div className='resultNumbers'><div className='dataStuff bold'>
          <div>Total time spent charging</div>
          <div>{getTotalTimeSpentCharging(80)}</div>
          <div>{getTotalTimeSpentCharging(100)}</div>
        </div></div> */}

        <div className='chartHolder'>
          <Chart {...getChartData()} />
        </div>
      </div >



    </>

  );
}

export default App;
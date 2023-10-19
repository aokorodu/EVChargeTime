import React, { useEffect, useState } from 'react';
import './App.css';
import Selector from './components/Selector';
import CustomSelector from './components/CustomSelector';

function App() {
  const chargeCurve = [2.36, 2.07, 2.07, 2.07, 2.53, 2.85, 3.3, 18]
  const defaultRange: Number = 285;
  const [startcharge, setStartCharge] = useState(10);
  const [endcharge, setEndCharge] = useState(80);
  const [range, setRange] = useState(defaultRange);
  const [driveTime, setDriveTime] = useState(0);
  const [waitTime, setWaitTime] = useState(0);
  const [totalTimePer, setTotalTimePer] = useState(0);
  const [testDistance, setTestDistance] = useState(1000)

  useEffect(() => {
    recalculate();
  }, [startcharge, endcharge, range, driveTime, waitTime, testDistance])


  const calculateTime = () => {

    const chargeTime = getChargingTime(startcharge, endcharge);
    const totalTime = chargeTime + driveTime + waitTime;

    return totalTime;
  }

  const recalculate = () => {
    setTotalTimePer(calculateTime())
  }
  const changeStart = (e: String) => {
    const num = Number(e);
    setStartCharge(num);
  }

  const changeEnd = (e: String) => {
    setEndCharge(Number(e));
  }

  const waitEnd = (e: String) => {
    setWaitTime(Number(e))
  }

  const getChargingTime = (startcharge: number, endcharge: number): number => {
    const startIndex = (startcharge / 10) - 1;
    const endIndex = (endcharge / 10 - 2);
    let sum = 0;
    for (let i = startIndex; i <= endIndex; i++) {
      const current = chargeCurve[i];
      console.log('current: ', current)
      if (current) sum += current;
    }

    return Math.round(sum)
  }

  const getNumberOfChargingSessions = (): number => {
    const dist = Math.round((endcharge - startcharge) / 100 * Number(range));
    const num = Math.ceil(testDistance / dist);

    return num;
  }

  const getTotalTimeSpentCharging = (): string => {
    const num = getNumberOfChargingSessions();
    const totalMinutes = Math.round(num * totalTimePer);

    const str = getTimeString(totalMinutes)
    return str;
  }

  const getTimeString = (min: number): string => {
    const hours = Math.floor(min / 60);
    let minutes = String(min % 60);
    if (minutes.length == 1) minutes = `0${minutes}`;
    const str = `${hours}:${minutes}`;

    return str;
  }
  return (
    <>
      <div className='controls'>
        <div className='chargeLevelControls'>
          <CustomSelector label="Start Charge" value={10} valueOptions={[10, 20, 30, 40, 50]} callback={changeStart} suffix='%' />

          <CustomSelector label='End Charge' value={80} valueOptions={[80, 100]} callback={changeEnd} suffix='%' />
        </div>
        <div className='dynamicNumbers'>

          <div className='inputStuff'>100% range: <input value={String(range)} onChange={(e) => { setRange(Number(e.target.value)) }} /></div>

          <div className='inputStuff'>Drive time to charger (min)
            <input value={driveTime} onChange={(e) => { setDriveTime(Number(e.target.value)) }}></input>
          </div>

          <div className='inputStuff'>Wait time to charge (min)
            <Selector value={0} valueOptions={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]} callback={waitEnd} />
          </div>
          <div className='inputStuff'>Test Distance
            <input value={testDistance} onChange={(e) => { setTestDistance(Number(e.target.value)) }}></input></div>

        </div>



        <div className='resultNumbers'>
          <div className='dataStuff'>
            <div>Range between start and end:</div>
            <div>{Math.round((endcharge - startcharge) / 100 * Number(range))}</div>
          </div>
          <div className='dataStuff'>
            <div>Total non-charging time: </div>
            <div>{getTimeString(driveTime + waitTime)}</div>
          </div>
          <div className='dataStuff'>
            <div>Total charging time: </div>
            <div>{getTimeString(getChargingTime(startcharge, endcharge))}</div>
          </div>



          <div className='dataStuff'>
            <div>Total time per charge: </div>
            <div>{getTimeString(totalTimePer)}</div>
          </div>
          <div className='dataStuff'>
            <div>Number of charging stops to cover test distance:</div>
            <div>{getNumberOfChargingSessions()}</div>
          </div>
          <div className='dataStuff'>
            <label>Total time spent charging</label>
            <div>{getTotalTimeSpentCharging()}</div>
          </div>
        </div>


      </div>


    </>

  );
}

export default App;

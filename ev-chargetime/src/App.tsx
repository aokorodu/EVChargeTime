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
    const startIndex = (startcharge / 10) - 1;
    const endIndex = (endcharge / 10 - 2);
    const chargeTime = getChargingTime(startIndex, endIndex);
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

  const getChargingTime = (start: number, end: number): number => {
    let sum = 0;
    for (let i = start; i <= end; i++) {
      const current = chargeCurve[i];
      console.log('current: ', current)
      if (current) sum += current;
    }

    return sum
  }

  const getNumberOfChargingSessions = (): number => {
    const dist = Math.round((endcharge - startcharge) / 100 * Number(range));
    const num = Math.ceil(testDistance / dist);

    return num;
  }

  const getTotalTimeSpentCharging = (): number => {
    const num = getNumberOfChargingSessions();
    const time = num * totalTimePer;
    return Math.round(time);
  }
  return (
    <>
      <div className='controls'>
        <div className='chargeLevelControls'>
          <CustomSelector label="Start Charge" value={10} valueOptions={[10, 20, 30, 40, 50]} callback={changeStart} suffix='%' />

          <CustomSelector label='End Charge' value={80} valueOptions={[80, 100]} callback={changeEnd} suffix='%' />
        </div>
        <div className='dynamicNumbers'>

          <div className='inputStuff'>Max Range on a 100% charge: <input value={String(range)} onChange={(e) => { setRange(Number(e.target.value)) }} /></div>

          <div className='inputStuff'>Average Drive time to charger (in minutes)
            <input value={driveTime} onChange={(e) => { setDriveTime(Number(e.target.value)) }}></input>
          </div>

          <div className='inputStuff'>Average wait time to use charger (in minutes)
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
            <div>{driveTime + waitTime}</div>
          </div>
          <div className='dataStuff'>
            <div>Total time per charge: </div>
            <div>{Math.round(totalTimePer)}</div>
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

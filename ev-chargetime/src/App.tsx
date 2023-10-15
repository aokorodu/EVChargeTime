import React, { useState } from 'react';
import './App.css';
import Selector from './components/Selector';

function App() {
  const defaultRange: Number = 285;
  const [startcharge, setStartCharge] = useState(10);
  const [endcharge, setEndCharge] = useState(80);
  const [range, setRange] = useState(defaultRange);
  const [driveTime, setDriveTime] = useState(0);
  const [waitTime, setWaitTime] = useState(0);

  const changeStart = (e: String) => {
    setStartCharge(Number(e))
  }

  const changeEnd = (e: String) => {
    setEndCharge(Number(e));
  }

  const waitEnd = (e: String) => {
    setWaitTime(Number(e))
  }
  return (
    <>
      <div className='controls'>
        <div>
          <label>Start Charge %</label>
          <Selector value={10} valueOptions={[10, 20, 30, 40, 50]} callback={changeStart} />
        </div>

        <div>
          <label>End Charge %</label>
          <Selector value={80} valueOptions={[80, 100]} callback={changeEnd} />
        </div>
        <hr />
        <div>
          <label>Average Drive time to charger (in minutes)</label>
          <input value={driveTime} onChange={(e) => { setDriveTime(Number(e.target.value)) }}></input>
        </div>

        <div>
          <label>Average wait time to use charger (in minutes)</label>
          <Selector value={0} valueOptions={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]} callback={waitEnd} />
        </div>

        <div>
          <div>Total non-charging time: {driveTime + waitTime}</div>
        </div>

        <hr />
        <div>Total Range</div>
        <input value={String(range)} onChange={(e) => { setRange(Number(e.target.value)) }} />
        <div>Range between start and end: {Math.round((endcharge - startcharge) / 100 * Number(range))}</div>
      </div>
    </>

  );
}

export default App;

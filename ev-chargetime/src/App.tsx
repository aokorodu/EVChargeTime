import React, { useState } from 'react';
import './App.css';
import Selector from './components/Selector';

function App() {

  const [startcharge, setStartCharge] = useState(10);
  const [endcharge, setEndCharge] = useState(80);

  const changeStart = (e: String) => {
    setStartCharge(Number(e))
  }

  const changeEnd = (e: String) => {
    setEndCharge(Number(e));
  }
  return (
    <>
      <div>
        <label>Start Charge</label>
        <Selector value={10} valueOptions={[10, 20, 30, 40, 50]} callback={changeStart} />
      </div>
      <div>
        <label>End Charge</label>
        <Selector value={80} valueOptions={[80, 90]} callback={changeEnd} />
      </div>

      <div>
        <div>Start Charge: {startcharge}%</div>
        <div>End Charge: {endcharge}%</div>
      </div>
    </>

  );
}

export default App;

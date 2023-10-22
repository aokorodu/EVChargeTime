import { useState } from "react";
import ChargeComparison from "./components/ChargeComparison";
import Intro from "./components/Intro";

function App() {
  const [started, setStart] = useState(false);

  const begin = () => {
    setStart(true);
  }
  return (
    <>
      {started && <ChargeComparison />}
      {!started && <Intro callback={begin} />}
    </>
  )

}

export default App;

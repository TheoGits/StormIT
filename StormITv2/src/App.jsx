import { useState } from 'react';
import './App.css';
import BM from './BM';
import BR from './BR';
import Forside from './Forside';
import AnimatedShapes from './AnimatedShapes';
import DonateButton from './Donate';

function App() {
  const [showBR, setShowBR] = useState(false);

  const handleButtonClick = () => {
    setShowBR(true);
  };

  return (
    <>
      {!showBR ? <Forside onButtonClick={handleButtonClick} /> : <BR />}
      {!showBR && <AnimatedShapes />}
      <BM></BM>

    </>
  );
}

export default App;

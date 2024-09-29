import { useState } from 'react';
import './App.css';
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
    </>
  );
}

export default App;

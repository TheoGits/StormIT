import React, { useRef, useState, useEffect } from 'react';

const VDU = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, [color, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
    if (isEraser) {
      setColor('white'); // Bytter til viskelær (hvit farge)
    } else {
      setColor('black'); // Bytter tilbake til standard farge
    }
  };

  return (
    <div>
      {/* Verktøylinje for å velge farge, blyantstørrelse og viskelær */}
      <div style={{ marginBottom: '10px' }}>
        <label>Farge:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <label>Blyantstørrelse:</label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(e.target.value)}
        />
        <button onClick={toggleEraser}>
          {isEraser ? 'Bytt til blyant' : 'Bruk viskelær'}
        </button>
      </div>

      {/* Tegneområde */}
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        ref={canvasRef}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default VDU;

import React, { useRef, useState, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedDrawings, setSavedDrawings] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [isAdvancedDrawing, setIsAdvancedDrawing] = useState(false);
  const [isEnterDisabled, setIsEnterDisabled] = useState(false);
  const [pencilColor, setPencilColor] = useState('black');
  const [pencilSize, setPencilSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.documentElement.style.margin = 0;
    document.documentElement.style.padding = 0;
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = pencilColor;
    context.lineWidth = pencilSize;
    contextRef.current = context;

    if (isAdvancedDrawing) {
      loadExistingDrawing();
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && !isEnterDisabled) {
        if (isPreviewMode) {
          showNextPreview();
        } else {
          saveDrawing();
          clearCanvas();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
    };
  }, [isPreviewMode, currentPreviewIndex, isEnterDisabled, isAdvancedDrawing]);

  const loadExistingDrawing = () => {
    const img = new Image();
    img.src = savedDrawings[currentPreviewIndex];
    img.onload = () => {
      const canvas = canvasRef.current;
      const context = contextRef.current;

      // Set the coordinates and dimensions of the area
      const rectX = 50;
      const rectY = 50;
      const rectWidth = 300;
      const rectHeight = 300;
      const padding = 10;

      // Clear and fill the specific area with a styled box
      context.clearRect(rectX, rectY, rectWidth, rectHeight);
      context.fillStyle = '#333';
      context.fillRect(rectX, rectY, rectWidth, rectHeight);

      // Draw a border around the box
      context.strokeStyle = 'white';
      context.lineWidth = 2;
      context.strokeRect(rectX, rectY, rectWidth, rectHeight);

      // Calculate the aspect ratio of the image
      const imgAspectRatio = img.width / img.height;
      let drawWidth = rectWidth - padding * 2;
      let drawHeight = rectHeight - padding * 2;

      // Adjust the dimensions to maintain the aspect ratio
      if (drawWidth / drawHeight > imgAspectRatio) {
        drawWidth = drawHeight * imgAspectRatio;
      } else {
        drawHeight = drawWidth / imgAspectRatio;
      }

      // Calculate the coordinates to center the image in the box
      const drawX = rectX + (rectWidth - drawWidth) / 2;
      const drawY = rectY + (rectHeight - drawHeight) / 2;

      // Draw the image inside the box without stretching it
      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };
  };

  const startDrawing = ({ nativeEvent }) => {
    // Only start drawing if the left mouse button is clicked
    if (nativeEvent.button !== 0) return;

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
    // Only draw when isDrawing is true and left-click is held down
    if (!isDrawing || isPreviewMode) return;

    const { offsetX, offsetY } = nativeEvent;

    // Draw a smooth line using quadratic curve
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    // Move the drawing point slightly backward to create a smoother transition
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    setSavedDrawings((prevDrawings) => [...prevDrawings, dataUrl]);
  };

  const handlePreviewClick = () => {
    if (savedDrawings.length > 0) {
      setCurrentPreviewIndex(0);
      setIsPreviewMode(true);
      setTimeout(() => {
        document.getElementById('preview-screen').focus();
      }, 100);
    }
  };

  const showNextPreview = () => {
    setIsEnterDisabled(true);
    setTimeout(() => setIsEnterDisabled(false), 300);

    if (currentPreviewIndex < savedDrawings.length - 1) {
      setCurrentPreviewIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsPreviewMode(false);
    }
  };

  const handleDevelopIdea = () => {
    setIsPreviewMode(false);
    setIsAdvancedDrawing(true);
    
    // Apply the correct pencil color and size when entering advanced drawing mode
    contextRef.current.strokeStyle = pencilColor;
    contextRef.current.lineWidth = pencilSize;
    contextRef.current.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
  };

  const handleColorChange = (color) => {
    setPencilColor(color);
    setIsErasing(false);
    contextRef.current.globalCompositeOperation = 'source-over';
    contextRef.current.strokeStyle = color;
  };

  const handlePencilSizeChange = (size) => {
    setPencilSize(size);
    contextRef.current.lineWidth = size;
  };

  const handleErase = () => {
    setIsErasing(true);
    contextRef.current.globalCompositeOperation = 'destination-out';
    contextRef.current.lineWidth = pencilSize;
  };

  const saveAsJPG = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.8);
    link.download = 'drawing.jpg';
    link.click();
  };

  const handleRightClick = (event) => {
    event.preventDefault(); // Prevent the default right-click menu
    const { offsetX, offsetY } = event.nativeEvent;
    const text = prompt('Enter text:');
    if (text) {
      const context = contextRef.current;
      context.font = '20px Arial';
      context.fillStyle = pencilColor;
      context.fillText(text, offsetX, offsetY);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      {/* Drawing Area */}
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        onContextMenu={handleRightClick} // Right-click handler
        ref={canvasRef}
        style={{ display: 'block' }}
      />

      {/* Preview Mode */}
      {isPreviewMode && (
        <div
          id="preview-screen"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            outline: 'none',
          }}
          tabIndex={0}
        >
          <img
            src={savedDrawings[currentPreviewIndex]}
            alt={`Drawing ${currentPreviewIndex + 1}`}
            style={{ maxWidth: '90%', maxHeight: '90%' }}
          />
          <button
            onClick={handleDevelopIdea}
            style={{ position: 'absolute', bottom: '30px', left: '10px' }}
          >
            Develop Idea
          </button>
        </div>
      )}

      {/* Advanced Drawing Board with Tools */}
      {isAdvancedDrawing && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
          {/* Save Button */}
          <button
            onClick={saveAsJPG}
            style={{
              position: 'absolute',
              top: '10px',
              right: '20px',
              padding: '10px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Save as JPG
          </button>

          {/* Tools Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              padding: '10px 20px',
              backgroundColor: '#222',
              color: 'white',
              borderRadius: '5px',
              position: 'absolute',
              top: '10px',
              left: '20px',
              margin: '470px',
            }}
          >
            {/* Color Picker */}
            <div>
              <input
                type="color"
                value={pencilColor}
                onChange={(e) => handleColorChange(e.target.value)}
                style={{ cursor: 'pointer' }}
              />
            </div>

            {/* Eraser Button */}
            <button
              onClick={handleErase}
              style={{
                padding: '5px 10px',
                backgroundColor: isErasing ? '#555' : '#333',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Eraser
            </button>

            {/* Pencil Size Slider */}
            <div>
              <input
                type="range"
                min="1"
                max="50"
                value={pencilSize}
                onChange={(e) => handlePencilSizeChange(e.target.value)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Canvas for Drawing */}
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onMouseLeave={finishDrawing}
            onContextMenu={handleRightClick} // Right-click handler
            ref={canvasRef}
          />
        </div>
      )}

      {/* Preview Button */}
      <button
        onClick={handlePreviewClick}
        style={{ position: 'absolute', bottom: '30px', left: '10px', margin: '10px' }}
      >
        Preview
      </button>
    </div>
  );
};

export default Canvas;

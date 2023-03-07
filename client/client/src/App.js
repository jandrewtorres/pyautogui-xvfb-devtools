import React, { useState, useRef, useEffect } from "react";

function App() {
  const [clicks, setClicks] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [currentRect, setCurrentRect] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const imgCanvasRef = useRef(null);

  useEffect(() => {
    const imgCanvas = imgCanvasRef.current;
    const canvas = canvasRef.current;
    const imgContext = imgCanvas.getContext("2d");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = "http://localhost:5000/stream.jpg";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      imgCanvas.width = img.width;
      imgCanvas.height = img.height;
      imgContext.drawImage(img, 0, 0);
    };
    clicks.forEach(( {x, y} ) => {
      context.strokeStyle = "#000000";
      context.lineWidth = 10;
      context.beginPath();
      context.arc(x, y, 40, 0, 2 * Math.PI);
      context.stroke();
      console.log('drawing point')
    });
  }, [clicks]);



  const handleMouseDown = (event) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = event.nativeEvent;
    setCurrentRect({ x1: offsetX, y1: offsetY });
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    setCurrentRect((prev) => ({ ...prev, x2: offsetX, y2: offsetY }));
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (!currentRect) return;
    setRectangles((prev) => [...prev, currentRect]);
    setCurrentRect(null);
  };

  const handleDeleteClick = (index) => {
    setClicks((prev) => prev.filter((click, i) => i !== index));
  };

  const handleDeleteRect = (index) => {
    setRectangles((prev) => prev.filter((rect, i) => i !== index));
  };

  const handleCanvasClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setClicks((prev) => [...prev, { x: offsetX, y: offsetY }]);
  };

  return (
    <div id="root">
      <div id="canvas-container" >
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ zIndex: "1" }}
        />
        <canvas
          ref={imgCanvasRef}
          width={1280}
          height={720}
          style={{ zIndex: "0" }}
        />
      </div>
      <span id="spacer"></span>
      <div id="logs">
        <h2>Clicks:</h2>
        <ul>
          {clicks.map((click, index) => (
            <li key={index}>
              x: {click.x}, y: {click.y}{" "}
              <button onClick={() => handleDeleteClick(index)}>x</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Rectangles:</h2>
        <ul>
          {rectangles.map((rect, index) => (
            <li key={index}>
              x1: {rect.x1}, y1: {rect.y1}, x2: {rect.x2}, y2: {rect.y2}{" "}
              <button onClick={() => handleDeleteRect(index)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
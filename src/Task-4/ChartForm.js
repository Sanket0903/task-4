import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChartForm = () => {
  const [box1Value, setBox1Value] = useState('');
  const [box2Value, setBox2Value] = useState('');
  const [showChart, setShowChart] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      const drawChart = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const box1Percentage = parseInt(box1Value);
        const box2Percentage = parseInt(box2Value);
        const total = box1Percentage + box2Percentage;

        if (total > 0) {
          const box1Angle = (box1Percentage / total) * 2 * Math.PI;
          const box2Angle = (box2Percentage / total) * 2 * Math.PI;

          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const radius = Math.min(canvas.width, canvas.height) / 2;

          // Draw Box 1
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, 0, box1Angle);
          ctx.fillStyle = '#007bff';
          ctx.fill();

          // Draw Box 2
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, box1Angle, box1Angle + box2Angle);
          ctx.fillStyle = '#28a745';
          ctx.fill();
        }
      };

      if (showChart) {
        drawChart();
      }
    }
  }, [box1Value, box2Value, showChart]);

  const handleChangeBox1 = (e) => {
    let value = parseInt(e.target.value);
    if (value > 100) {
      value = 100;
    }
    setBox1Value(value.toString());
    setBox2Value((100 - value).toString());
  };

  const handleChangeBox2 = (e) => {
    let value = parseInt(e.target.value);
    if (value > 100) {
      value = 100;
    }
    setBox2Value(value.toString());
    setBox1Value((100 - value).toString());
  };

  const handleCreateChart = () => {
    setShowChart(true);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="box1">Box 1:</label>
            <input
              type="number"
              id="box1"
              className="form-control"
              value={box1Value}
              onChange={handleChangeBox1}
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="box2">Box 2:</label>
            <input
              type="number"
              id="box2"
              className="form-control"
              value={box2Value}
              onChange={handleChangeBox2}
            />
          </div>

          {parseInt(box1Value) + parseInt(box2Value) > 100 && (
            <p className="text-danger">Sum of values cannot exceed 100%</p>
          )}

          <button className="btn btn-primary mt-4" onClick={handleCreateChart}>Create Chart</button>

          {showChart && (
            <canvas ref={canvasRef} width={200} height={200} style={{ margin: '20px' }} className="border" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartForm;
import { useState } from 'react';
import Tile from './components/Tile';
import ColorPicker from './components/ColorPicker';

const App = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const rows = 10;
  const columns = 10;

  const colorOptions = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e', 'eraser'];

  return (
    <div style={{ textAlign: 'center' }}>
      <ColorPicker
        colors={colorOptions}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 100px)`,
          gridTemplateRows: `repeat(${rows}, 100px)`,
          width: `${columns * 100}px`,
          height: `${rows * 100}px`,
          margin: 'auto',
          border: '4px solid #222',
          boxSizing: 'content-box'
        }}
      >
        {Array.from({ length: rows * columns }).map((_, i) => (
          <Tile key={i} id={i + 1} color={selectedColor} />
        ))}
      </div>
    </div>
  );
};

export default App;

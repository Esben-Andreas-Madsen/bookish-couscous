import { useState, useEffect } from 'react';
import './Tile.css';

const Tile = ({ id, selectedColor, savedColor }) => {
  const [color, setColor] = useState(savedColor || null);

  useEffect(() => {
    setColor(savedColor || null); // Update color whenever savedColor changes
  }, [savedColor]);

  const handleClick = async () => {
    const newColor = selectedColor === 'eraser' ? null : selectedColor;
    setColor(newColor);

    await fetch('http://localhost:4000/api/tile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, color: newColor || '' }), // empty string for erase
    });
  };

  return (
    <div
      className="tile"
      onClick={handleClick}
      style={{
        backgroundColor: color || 'transparent',
        border: '1px solid #ccc',
        width: '100px',
        height: '100px',
      }}
    />
  );
};

export default Tile;

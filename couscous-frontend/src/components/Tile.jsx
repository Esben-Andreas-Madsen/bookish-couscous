import { useState } from 'react';
import './Tile.css';

const Tile = ({ id, color }) => {
  const [clickedColor, setClickedColor] = useState(null);

  const handleClick = () => {
    if (color === 'eraser') {
      setClickedColor(null); // erase
    } else {
      setClickedColor(color); // paint
    }
  };

  return (
    <div
      className="tile"
      style={{ backgroundColor: clickedColor || 'transparent' }}
      onClick={handleClick}
    />
  );
};

export default Tile;

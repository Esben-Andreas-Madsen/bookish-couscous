import './ColorPicker.css';

const ColorPicker = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <div className="color-picker">
      {colors.map((color) => {
        const isEraser = color === 'eraser';
        return (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            className={`color-button ${selectedColor === color ? 'selected' : ''} ${isEraser ? 'eraser' : ''}`}
            style={{ backgroundColor: isEraser ? '#fff' : color }}
          >
            {isEraser ? '✕' : ''}
          </button>
        );
      })}
    </div>
  );
};

export default ColorPicker;

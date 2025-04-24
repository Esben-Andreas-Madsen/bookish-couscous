import { useEffect, useState } from 'react';
import Tile from './components/Tile';
import ColorPicker from './components/ColorPicker';

const App = () => {
  const [tiles, setTiles] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#3498db');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch tiles from the API initially
    const fetchTiles = async () => {
      const res = await fetch('http://localhost:4000/api/tiles');
      const data = await res.json();
      // Fill tiles with defaults if the number is less than 100
      const allTiles = Array.from({ length: 100 }, (_, i) => {
        return data.find((tile) => tile.id === i) || { id: i, color: null };
      });
      setTiles(allTiles);
    };

    fetchTiles();

    // Function to initiate WebSocket connection
    const initWebSocket = () => {
      const socket = new WebSocket('ws://localhost:4000');
      socket.onopen = () => {
        console.log('WebSocket connected');
        setSocket(socket);
      };

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log('Received WebSocket message:', msg); // Check message structure
        if (msg.type === 'tileUpdate') {
          setTiles((prevTiles) => {
            return prevTiles.map((tile) =>
              tile.id === msg.tile.id ? { ...tile, color: msg.tile.color } : tile
            );
          });
        }
      };

      socket.onerror = () => {
        console.log('WebSocket failed, retrying...');
        setTimeout(initWebSocket, 1000); // Retry after 1 second
      };

      socket.onclose = () => {
        console.log('WebSocket closed, retrying...');
        setTimeout(initWebSocket, 1000); // Retry after 1 second
      };
    };

    initWebSocket();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  const tileCount = 100;
  const tileIds = Array.from({ length: tileCount }, (_, i) => i);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ColorPicker
        colors={['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', 'eraser']}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 100px)', gap: '2px' }}>
        {tileIds.map((id) => {
          const saved = tiles.find((t) => t.id === id);
          return (
            <Tile
              key={id}
              id={id}
              selectedColor={selectedColor}
              savedColor={saved?.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;

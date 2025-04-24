import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { WebSocketServer } from 'ws';
import http from 'http';

dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on('connection', (ws) => {
    console.log('Client connected via WebSocket 👋');
    clients.add(ws);
  
    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected ❌');
    });
  });
  

  function broadcastTileUpdate(tile) {
    const message = JSON.stringify({ type: 'tileUpdate', tile });
    console.log('Broadcasting tile update:', message); // Log the update
    for (const client of clients) {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    }
  }
  

// GET tiles
app.get('/api/tiles', async (req, res) => {
  const tiles = await prisma.tile.findMany();
  res.json(tiles);
});

// POST tile
app.post('/api/tile', async (req, res) => {
  const { id, color } = req.body;
  let tile = await prisma.tile.upsert({
    where: { id },
    update: { color },
    create: { id, color },
  });

  broadcastTileUpdate(tile);
  res.json(tile);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


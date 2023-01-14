import http from "http";
import dotenv from 'dotenv';
import { getUsers } from "./controller/userController";

const server = http.createServer((_req, res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'OK!' }));
});

dotenv.config();
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
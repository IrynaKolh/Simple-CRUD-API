import { createServer } from 'node:http';
import { IncomingMessage, ServerResponse } from "http";
import dotenv from 'dotenv';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './controller/userController';


export const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url?.match(/\/api\/users\/\S+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getUser(req, res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else if (req.url?.match(/\/api\/users\/\S+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateUser(req, res, id);
  } else if (req.url?.match(/\/api\/users\/\S+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteUser(req, res, id);
  }  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('Page not found!');
  }
});

dotenv.config();
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('SIGINT', () => {
  server.close(() => process.exit());
});
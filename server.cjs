const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware to ensure numeric IDs
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = Number(router.db.get('items').size() + 1); // Auto-increment and ensure it's a number
  }
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
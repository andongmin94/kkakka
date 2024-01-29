// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router([
  "alarm.json",
  "aliases.json",
  "chatlist.json",
  "dogam.json",
  "friends.json",
  "main.json",
]);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

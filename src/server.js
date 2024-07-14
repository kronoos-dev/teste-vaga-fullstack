const app = require('./app');
const http = require('http');

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
});
server.on('listening', () => console.log("Listening on " + port));

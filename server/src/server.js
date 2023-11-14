const http = require('http');
const {mongoConnect} = require('./services/mongo')
const app = require('./app');

const PORT = 8000;

const server = http.createServer(app);

server.listen(PORT, async () => {
    await mongoConnect()
    console.log(`App is running on port ${PORT}`);
})
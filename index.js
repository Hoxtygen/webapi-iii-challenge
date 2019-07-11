// code away!
const server = require('./server.js');
const port = process.env.PORT || 4002;

server.listen(port, () => {
    console.log(`* Server Running port ${port}`);
  });
  
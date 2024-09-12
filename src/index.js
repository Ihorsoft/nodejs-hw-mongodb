//src/index.js
import { startServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

const bootstrap = async () => {
  await initMongoDB();
  console.log('before start server in index.js');
  startServer();
  console.log('after  start server in index.js');
};
bootstrap();

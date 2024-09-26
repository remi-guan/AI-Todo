import Redis from 'ioredis';

// Create a new Redis client
const redis = new Redis({
  host: '127.0.0.1', // Redis server hostname (or your Redis server IP)
  port: 6379 // Redis server port
  // password: 'your-redis-password', // Uncomment if your Redis instance is password protected
});

export default redis;

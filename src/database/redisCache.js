import redis from 'redis';

// Crear un cliente Redis
const client = redis.createClient();

export { client }; // Export the Redis client
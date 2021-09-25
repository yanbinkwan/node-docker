module.exports = {
  MOUNGO_PORT: process.env.MOUNGO_PORT || '27017',
  MOUNGO_HOST: process.env.MOUNGO_HOST || 'mongo',
  MOUNGO_USERNAME: process.env.MOUNGO_USERNAME,
  MOUNGO_PASS: process.env.MOUNGO_PASS,
  SESSION_SECRET: process.env.SESSION_SECRET,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST || 'redis'
}

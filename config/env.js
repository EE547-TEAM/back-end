module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  sessionSecret: 'ee547',
  sessionExpireTime: 20 * 60 * 1000,
};

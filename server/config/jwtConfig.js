const jwtConfig = {
  access: {
    type: 'accessToken',
    expiresIn: `${1000 * 60 * 30}`, // 30 минут 
  },
  refresh: {
    type: 'refreshToken',
    expiresIn: `${1000 * 60 * 60 * 12}`, // 12 часа
  },
};

module.exports = jwtConfig;

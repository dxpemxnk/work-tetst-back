const jwt = require("jsonwebtoken")

function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log('Access token received:', accessToken); // Выводим токен для проверки

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    console.log('Decoded token:', decoded); // Проверяем, что расшифрованный токен содержит user

    res.locals.user = decoded.user; // Полагаем, что в токене есть объект user
    console.log('User set in res.locals:', res.locals.user); // Проверяем, что user добавлен в res.locals

    next();
  } catch (error) {
    console.log(error);
    console.log('Invalid access token');
    res.status(403).send('Invalid access token');
  }
}

module.exports = verifyAccessToken;

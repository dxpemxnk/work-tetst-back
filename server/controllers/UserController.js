const UserService = require("../service/User.service");

// Получение информации о текущем пользователе
exports.getUserInfoController = async (req, res) => {
  const userId = res.locals.user.id; // Предполагается, что пользователь аутентифицирован

  try {
    const user = await UserService.getUserInfo(userId);
    res.status(200).json({ message: "Success", user });
  } catch (error) {
    res.status(500).json({ message: error.message, user: null });
  }
};
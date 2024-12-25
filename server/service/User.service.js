const { User } = require("../db/models");

class UserService {
  static async getUserInfo(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["id", "email", "avatar"], // Возвращаем только нужные поля
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
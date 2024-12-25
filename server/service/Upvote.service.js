const { Upvote, Feedback, User } = require("../db/models");

class UpvoteService {
  // Голосование за предложение
  static async vote(feedback_id, user_id) {
    try {
      // Проверяем, существует ли предложение
      const feedback = await Feedback.findByPk(feedback_id);
      if (!feedback) {
        throw new Error("Feedback not found");
      }

      // Проверяем, голосовал ли пользователь за это предложение
      const existingUpvote = await Upvote.findOne({
        where: { user_id, feedback_id },
      });

      if (existingUpvote) {
        // Если голос уже существует, удаляем его (отменяем голос)
        await existingUpvote.destroy();
        return { message: "Upvote removed" };
      } else {
        // Если голоса нет, создаем новый голос
        await Upvote.create({ user_id, feedback_id });
        return { message: "Upvote added" };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Получение всех голосов
  static async getAllUpvotes() {
    try {
      const upvotes = await Upvote.findAll({
        include: [
          { model: Feedback, attributes: ["id", "title", "description"] },
          { model: User, attributes: ["id", "email"] }, // Если нужно добавить информацию о пользователе
        ],
      });
      return upvotes;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Получение голоса по ID
  static async getUpvoteById(id) {
    try {
      const upvote = await Upvote.findByPk(id, {
        include: [
          { model: Feedback, attributes: ["id", "title", "description"] },
          { model: User, attributes: ["id", "email"] },
        ],
      });
      if (!upvote) {
        throw new Error("Upvote not found");
      }
      return upvote;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Удаление голоса по ID
  static async deleteUpvote(id) {
    try {
      const deletedCount = await Upvote.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new Error("Upvote not found");
      }
      return { message: "Upvote deleted" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Получение всех голосов пользователя
  static async getUserUpvotes(userId) {
    try {
      const upvotes = await Upvote.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Feedback,
            attributes: ["id", "title", "description"], // Включаем только нужные поля из Feedback
          },
        ],
      });
      return upvotes;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getFeedbackUpvotes(feedbackId) {
    try {
      const upvotes = await Upvote.findAll({
        where: { feedback_id: feedbackId },
        include: [
          {
            model: User,
            attributes: ["id", "email", "avatar"], // Здесь можно указать нужные поля
          },
          {
            model: Feedback,
            attributes: ["id", "title", "description"], // Включаем только нужные поля из Feedback
          },
        ],
      });
      return upvotes;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UpvoteService;

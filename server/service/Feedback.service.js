// service/Feedback.service.js
const { Feedback, Category, Upvote, User, Status } = require("../db/models");
const { Op } = require("sequelize");

class FeedbackService {
  // Получение всех фидбеков с фильтрацией и сортировкой
  async getAllFeedbacks(filterParams = {}, sortParams = {}) {
    const { category_id, status_id } = filterParams; // Фильтрация по категориям и статусам
    const { sortBy, order } = sortParams; // Сортировка по количеству голосов или дате

    const whereClause = {};

    if (category_id) {
      whereClause.category_id = category_id; // Фильтрация по категории
    }

    if (status_id) {
      whereClause.status_id = status_id; // Фильтрация по статусу
    }

    const orderClause = [];

    // Сортировка
    if (sortBy) {
      if (sortBy === "votes") {
        orderClause.push([Upvote, "count", order || "DESC"]); // Сортировка по количеству голосов
      } else if (sortBy === "createdAt") {
        orderClause.push(["createdAt", order || "DESC"]); // Сортировка по дате создания
      }
    }

    return await Feedback.findAll({
      where: whereClause,
      include: [
        { model: Status },
        { model: Category }, // Категория фидбека
        { model: User, as: "author" }, // Автор фидбека
        { model: User, as: "upvotedUsers", through: Upvote }, // Проголосовавшие пользователи
      ],
      order: orderClause,
    });
  }

  // Получение одного фидбека по ID
  async getOneFeedback(id) {
    return await Feedback.findByPk(id, {
      include: [
        { model: Status },
        { model: Category }, // Категория фидбека
        { model: User, as: "author" }, // Автор фидбека (используем алиас "author")
        { model: User, as: "upvotedUsers", through: Upvote }, // Пользователи, проголосовавшие за фидбек (используем алиас "upvotedUsers")
      ],
    });
  }

  // Создание нового фидбека
  async createFeedback(feedbackData) {
    return await Feedback.create(feedbackData);
  }

  // Обновление фидбека
  async updateFeedback(id, feedbackData) {
    const [updatedRows] = await Feedback.update(feedbackData, {
      where: { id },
    });
    return updatedRows > 0;
  }

  // Удаление фидбека
  async deleteFeedback(id) {
    return await Feedback.destroy({ where: { id } });
  }
}

module.exports = new FeedbackService();

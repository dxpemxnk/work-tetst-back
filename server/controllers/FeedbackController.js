// controllers/FeedbackController.js
const FeedbackService = require("../service/Feedback.service");

class FeedbackController {
    // Получение всех фидбеков с фильтрацией и сортировкой
    async getAllFeedbacks(req, res) {
        try {
            const { category_id, status_id, sortBy, order } = req.query;

            const filterParams = {
                category_id,
                status_id,
            };

            const sortParams = {
                sortBy,
                order,
            };

            const feedbacks = await FeedbackService.getAllFeedbacks(filterParams, sortParams);
            res.status(200).json(feedbacks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to get feedbacks" });
        }
    }

    // Получение одного фидбека по ID
    async getOneFeedback(req, res) {
        try {
            const { id } = req.params;
            const feedback = await FeedbackService.getOneFeedback(id);
            if (!feedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            res.status(200).json(feedback);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to get feedback" });
        }
    }

    // Создание нового фидбека
    async createFeedback(req, res) {
      try {
          const { title, description, category_id, status_id, user_id } = req.body;

          // Проверяем, что все обязательные поля переданы
          if (!title || !description || !category_id || !status_id || !user_id) {
              return res.status(400).json({ message: "All fields (title, description, category_id, status_id, user_id) are required" });
          }

          const newFeedback = await FeedbackService.createFeedback({
              title,
              description,
              category_id,
              status_id,
              user_id,
          });

          res.status(201).json(newFeedback);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Failed to create feedback" });
      }
  }

    // Обновление фидбека
    async updateFeedback(req, res) {
        try {
            const { id } = req.params;
            const { title, description, category_id, status_id, user_id  } = req.body;
            const updated = await FeedbackService.updateFeedback(id, { title, description, category_id, status_id, user_id  });
            if (!updated) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            res.status(200).json({ message: "Feedback updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update feedback" });
        }
    }

    // Удаление фидбека
    async deleteFeedback(req, res) {
        try {
            const { id } = req.params;
            const deleted = await FeedbackService.deleteFeedback(id);
            if (!deleted) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            res.status(200).json({ message: "Feedback deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete feedback" });
        }
    }
}

module.exports = new FeedbackController();
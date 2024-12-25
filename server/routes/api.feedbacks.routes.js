// routes/feedbackRoutes.js

const router = require("express").Router();
const FeedbackController = require("../controllers/FeedbackController");
const verifyAccessToken = require("../middleware/verifyAccessToken");

// Получение всех фидбеков с возможной фильтрацией и сортировкой
router.route("/")
  .get(FeedbackController.getAllFeedbacks) // Получение всех фидбеков
  .post(verifyAccessToken, FeedbackController.createFeedback); // Создание нового фидбека (только для авторизованных)

// Получение фидбека по ID, с возможностью обновления и удаления
router.route("/:id")
  .get(FeedbackController.getOneFeedback) // Получение одного фидбека
  .put(verifyAccessToken, FeedbackController.updateFeedback) // Обновление фидбека (только для авторизованных)
  .delete(verifyAccessToken, FeedbackController.deleteFeedback); // Удаление фидбека (только для авторизованных)

module.exports = router;

const router = require("express").Router();
const {
  voteController, 
  getAllUpvotesController, 
  getUpvoteByIdController, 
  deleteUpvoteController, 
  getUserUpvotesController, 
  getFeedbackUpvotesController, 
} = require("../controllers/UpvoteController");
const verifyAccessToken = require("../middleware/verifyAccessToken");

// Голосование за предложение
router.post("/:feedbackId", verifyAccessToken, voteController); // Используйте :feedbackId вместо :id для ясности

// Получение всех голосов
router.get("/", getAllUpvotesController);

// Получение голоса по ID
router.get("/:id", getUpvoteByIdController);

// Удаление голоса по ID
router.delete("/:id", deleteUpvoteController);

// Получение всех голосов пользователя
router.get("/user/:userId", getUserUpvotesController); // Параметр userId, чтобы явно указать, чьи голоса мы получаем

// Получение всех голосов за предложение
router.get("/feedback/:feedbackId", getFeedbackUpvotesController); // Используем feedbackId, как в других местах

module.exports = router;

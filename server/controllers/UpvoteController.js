const UpvoteService = require("../service/Upvote.service");

// Голосование за предложение
exports.voteController = async (req, res) => {
  const { feedbackId } = req.params; // Берем id из параметра маршрута
  const userId = res.locals.user.id; // ID аутентифицированного пользователя

  console.log("Feedback ID:", feedbackId); // Debug
  console.log("User ID:", userId); // Debug

  if (!feedbackId || !userId) {
    return res.status(400).json({ message: "Feedback ID and authenticated User ID are required." });
  }

  try {
    // Вызов сервиса голосования
    const result = await UpvoteService.vote(feedbackId, userId);
    res.status(200).json({ message: "Vote successfully recorded.", result });
  } catch (error) {
    console.error(error); // Добавлен лог для ошибок
    res.status(500).json({ message: "Failed to record vote.", error: error.message });
  }
};

// Получение всех голосов
exports.getAllUpvotesController = async (req, res) => {
  try {
    const upvotes = await UpvoteService.getAllUpvotes();
    res.status(200).json({ message: "Success", upvotes });
  } catch (error) {
    console.error(error); // Добавлен лог для ошибок
    res.status(500).json({ message: error.message, upvotes: [] });
  }
};

// Получение голоса по ID
exports.getUpvoteByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const upvote = await UpvoteService.getUpvoteById(id);
    if (!upvote) {
      return res.status(404).json({ message: "Upvote not found" });
    }
    res.status(200).json({ message: "Success", upvote });
  } catch (error) {
    console.error(error); // Добавлен лог для ошибок
    res.status(500).json({ message: error.message, upvote: null });
  }
};

// Удаление голоса по ID
exports.deleteUpvoteController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await UpvoteService.deleteUpvote(id);
    if (deletedCount > 0) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "Upvote not found" });
    }
  } catch (error) {
    console.error(error); // Добавлен лог для ошибок
    res.status(500).json({ message: error.message });
  }
};

// Получение всех голосов пользователя
exports.getUserUpvotesController = async (req, res) => {
  const userId = req.user.id; // Предполагается, что пользователь аутентифицирован
  try {
    const upvotes = await UpvoteService.getUserUpvotes(userId);
    res.status(200).json({ message: "Success", upvotes });
  } catch (error) {
    console.error(error); // Добавлен лог для ошибок
    res.status(500).json({ message: error.message, upvotes: [] });
  }
};

// Получение всех голосов за предложение
exports.getFeedbackUpvotesController = async (req, res) => {
  const { feedbackId } = req.params; // Используем feedbackId для единообразия
  try {
    const upvotes = await UpvoteService.getFeedbackUpvotes(feedbackId);
    if (!upvotes || upvotes.length === 0) {
      return res.status(404).json({ message: "No upvotes found for this feedback." });
    }
    res.status(200).json({ message: "Success", upvotes });
  } catch (error) {
    console.error(error); // Добавлен лог для ошибок
    res.status(500).json({ message: error.message, upvotes: [] });
  }
};

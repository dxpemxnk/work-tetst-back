const router = require("express").Router();

// Подключение маршрутов
const apiAuthRouter = require("./api.auth.routes"); // Маршруты для аутентификации
const apiFeedbackRouter = require("./api.feedbacks.routes"); // Маршруты для фидбеков
const apiCategoryRouter = require("./api.categories.routes"); // Маршруты для категорий
const apiStatusRouter = require("./api.statuses.routes"); // Маршруты для статусов
const apiUpvoteRouter = require("./api.upvotes.routes"); // Маршруты для голосования
const apiUserRouter = require("./api.users.routes"); // Маршруты для пользователя

// Использование маршрутов
router.use("/auth", apiAuthRouter); // Аутентификация
router.use("/feedbacks", apiFeedbackRouter); // Фидбеки
router.use("/categories", apiCategoryRouter); // Категории
router.use("/statuses", apiStatusRouter); // Статусы
router.use("/upvotes", apiUpvoteRouter); // Голоса
router.use("/user", apiUserRouter); // Пользователь

module.exports = router;
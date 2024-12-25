Данный файл включает в себя интрукцию по запуску и работе,  а также API документацию 

http://localhost:3000/api

Для работы на сервервре требуется отредактировать database.json лежащий в папке server/db/config
Открыть терминал и написать - npm i для зависимостей, затем для запуска сервера написать - npm run dev
Для реализации CRUD операций потребуется установить ThunderClient в расширениях VSCode, либо использовать другую программу
При авторизации и регистрации создается AccessToken, его нужно использовать для работы с операциями, которые подразумевают авторизацию пользователя. Для обновления AccessToken нужно использовать RefreshToken 

Регистрация пользователя - Метод: POST http://localhost:3000/api/auth/registration
JSON {
    "email":"email@email.com",
    "password":"123",
    "avatar":"URL"
}
Пароль был добавлен для сохранности данных, также как и bycrypt для пароля
Автар необязателен к заполнению.
Ответ от сервера - 
{
  "message": "User registered successfully."
}

LOGOUT на метод DELETE - http://localhost:3000/api/auth/logout
Ответ - {
  "message": "clearCookie"
}

Авторизация на метод POST - http://localhost:3000/api/auth/authorization/

Ответ от сервера  - {
  "user": {
    "id": 3,
    "email": "sobaka@sobaka.com",
    "avatar": null,
    "createdAt": "2024-12-25T13:25:11.479Z",
    "updatedAt": "2024-12-25T13:25:11.479Z"
  },
  "accessToken": "Ваш токен"
}

После каждой авторизации или регистрации нужно обновлять врунчную ваш токен в Bearer Token, так работает ThunderClient

Для получения информации о пользователе используем GET запрос http://localhost:3000/api/user/

Для получения информации о статусах используем GET запрос http://localhost:3000/api/statuses/
Для получения информации о категориях используем GET запрос http://localhost:3000/api/categories/

CRUD операции для Feedbacks

POST http://localhost:3000/api/feedbacks/
JSON {
  "title": "New feature request",
  "description": "Description of the feature request.",
  "category_id": "Functionality",
  "status_id": "Idea",
  "user_id": 1
}

PUT http://localhost:3000/api/feedbacks/":id"

JSON {
   "title": "Updated feature request",
  "description": "Updated Description of the feature request.",
  "category_id": 1,
  "status_id": 1,
  "user_id": 1
}

DELETE http://localhost:3000/api/feedbacks/":id"

GET http://localhost:3000/api/feedbacks/

ГОЛОСОВАНИЯ 

POST http://localhost:3000/api/upvotes/":feedbackId"
Если голос есть - убирается
Если голоса нет - создается

Работа через промежуточную таблицу связей многие ко многим

Получить голоса также можно по запросу GET http://localhost:3000/api/upvotes/

Фильры по старусу GET http://localhost:3000/api/feedbacks?status_id=1
Фильтры по категории GET http://localhost:3000/api/feedbacks?category=1
Сортировка по количеству голосов по убыванию GET http://localhost:3000/api/feedbacks?sort=votes&order=desc
Сортировка по количеству голосов по возрастанию GET http://localhost:3000/api/feedbacks?sort=created_at&order=asc
Сортировка и фильтры одновременно GET http://localhost:3000/api/feedbacks?category_id=1&status_id=1&sort=votes&order=desc
Пагинация GET http://localhost:3000/api/feedbacks?page=2&limit=10

Error Responses
400 Bad Request: Ошибка в запросе (например, неправильный формат данных).
401 Unauthorized: Ошибка авторизации (например, неверный токен).
404 Not Found: Ресурс не найден.
500 Internal Server Error: Ошибка на сервере.
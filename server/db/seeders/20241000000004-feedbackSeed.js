module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Feedbacks",
      [
        {
          title: "Самое лучшее предложение",
          description: "Отличное и понятное описание",
          category_id: 1,
          status_id: 1,
          user_id: 1,
        },
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Feedbacks", null, {});
  },
};

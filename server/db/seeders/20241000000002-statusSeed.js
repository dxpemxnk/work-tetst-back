module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Statuses",
      [
        {
          title: "Идея",
        },
        {
          title: "Запланировано",
        },
        {
          title: "В работе",
        },
        {
          title: "Выполнено",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Statuses", null, {});
  },
};

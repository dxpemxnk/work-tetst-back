module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          title: "Функциональность",
        },
        {
          title: "Баг",
        },
        {
          title: "UI",
        },
        {
          title: "Производительность",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

const feedback = require("../models/feedback");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Upvotes",
      [
        {
          user_id: 1,
          feedback_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Upvotes", null, {});
  },
};

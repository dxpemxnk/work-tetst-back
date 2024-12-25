const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "example@mail.ru",
          password: bcrypt.hashSync("123", saltRounds),
          avatar: "https://64.media.tumblr.com/64b8a50d5c287a90e7b18b080f9c0850/71cb8a51bc7a9c5f-32/s250x400/b264015d8ccaf13294a04661a068817eee6adaad.png",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

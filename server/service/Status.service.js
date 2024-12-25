const { Status } = require("../db/models");

class StatusService {
  static async getAllStatus() {
    try {
      const categories = await Status.findAll({
        order: [["id", "ASC"]],
      });

      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getOneStatus(id) {
    try {
      const Status = await Status.findByPk(id);
      return Status;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createStatus(data) {
    try {
      const Status = await Status.create(data);
      return Status;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteStatus(id) {
    try {
      const countDeletedCategories = await Status.destroy({
        where: { id },
      });
      return countDeletedCategories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateStatus(data, id) {
    try {
      const [countUpdated] = await Status.update(data, { where: { id } });
      return countUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = StatusService;

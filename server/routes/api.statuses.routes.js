const router = require("express").Router();
const {
  getAllStatusController,
  createStatusController,
  deleteStatusController,
  updateStatusController,
  getOneStatusController,
} = require("../controllers/StatusController");

router.route('/')
  .get(getAllStatusController)
  .post(createStatusController);

router.route('/:id')
  .get(getOneStatusController)
  .put(updateStatusController)
  .delete(deleteStatusController);

module.exports = router;

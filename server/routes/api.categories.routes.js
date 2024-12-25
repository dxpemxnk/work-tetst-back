const router = require("express").Router();
const {
  getAllCategoryController,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getOneCategoryController,
} = require("../controllers/CategoryController");

router.route('/')
  .get(getAllCategoryController)
  .post(createCategoryController);

router.route('/:id')
  .get(getOneCategoryController)
  .put(updateCategoryController)
  .delete(deleteCategoryController);

module.exports = router;

const router = require("express").Router();
const {  getUserInfoController, } = require("../controllers/UserController");
const verifyAccessToken = require("../middleware/verifyAccessToken");



router.get("/", verifyAccessToken, getUserInfoController);

module.exports = router;

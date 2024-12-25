const router = require("express").Router();
const verifyRefreshToken = require("../middleware/verifyRefreshToken");
const { authorizationController,
  registrationController,
  logoutController,
  refreshController
} = require("../controllers/AuthController");

router.post("/registration", registrationController);
router.post("/authorization", authorizationController);
router.get("/refresh", verifyRefreshToken, refreshController);
router.delete("/logout", logoutController);

module.exports = router;

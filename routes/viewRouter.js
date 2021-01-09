/* Import */
const Router = require("express").Router;
const controller = require("../controllers/viewController");

/* Router */
const router = Router();

router.get("/", controller.main);
router.get("/_:pageId", controller.payload);

/* Export */
module.exports = router;

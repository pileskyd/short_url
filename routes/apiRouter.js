/* Import */
const Router = require("express").Router;
const controller = require("../controllers/apiController");

/* Router */
const router = Router();

router.post("/create", controller.create);
router.post("/list", controller.full_list);

/* Export */
module.exports = router;

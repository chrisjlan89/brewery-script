const allbreweries = require("../controllers/all_breweries");
const { sillygoose } = require("../controllers/sillygoose");

const router = require("express").Router();

router.get("/sillygoose", sillygoose);
router.get("/allbreweries", allbreweries);

module.exports = router;

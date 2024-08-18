const express = require("express");
const router = express.Router();
const usercontroller = require("../../controller/usercontroller");

router.post("/", usercontroller.createuser);
router.get("/:id", usercontroller.getuser);
router.patch("/:id", usercontroller.updateuser);
router.delete("/:id", usercontroller.removeuser);
router.post("/login", usercontroller.userlogin);

module.exports = router;
const express = require("express");

const { auth } = require("../middleware/auth");

const { registerStudent, loginStudent } = require("../controllers/auth");

const router = express.Router();

router.post("/userRegister", registerStudent);
router.post("/userLogin", loginStudent);

module.exports = router;

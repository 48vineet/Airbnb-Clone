const express = require("express");
const { route } = require("./listing");
const router = express.Router();
const User = require("../models/user.js");
const warpAsync = require("../utils/warpAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
    .get(userController.rendersignupform)
    .post(warpAsync(userController.signup));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);


router.get("/logout", userController.logout);

module.exports = router;
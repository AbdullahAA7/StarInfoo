const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/newWrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const {
  renderSignupForm,
  signUpUser,
  renderLoginForm,
  logInUser,
  logOutUser,
} = require("../controller/users.js");

router
  .route("/signup")
  //Show Sign up Page
  .get(renderSignupForm)
  // Sign up User
  .post(wrapAsync(signUpUser));

//Show login Page
router
  .route("/login")
  .get(renderLoginForm)
  //login User
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    logInUser
  );

//Log out User
router.get("/logout", logOutUser);

module.exports = router;

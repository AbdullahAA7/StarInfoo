const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/newWrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  index,
  renderNewLitingsForm,
  showListings,
  createListing,
  renderEditListing,
  updateListing,
  destroyListing,
} = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  //Index Route
  .get(wrapAsync(index))
  //Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createListing)
  );

//New Route
router.get("/new", isLoggedIn, renderNewLitingsForm);

router
  .route("/:id")
  //Show Route
  .get(wrapAsync(showListings))
  //Upadte Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(updateListing)
  )
  // Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditListing));

module.exports = router;

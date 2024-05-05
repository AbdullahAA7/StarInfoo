const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utilities/newWrapAsync.js");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const { addReview, destroyReview } = require("../controller/reviews.js");

// Add Review
router.post("/", isLoggedIn, validateReview, wrapAsync(addReview));

//Delete Review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(destroyReview)
);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const warpAsync = require("../utils/warpAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//post Review route
router.post("/", validateReview, isLoggedIn, warpAsync(reviewController.reviewPostRoute));

//Delete Review Route

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, warpAsync(reviewController.reviewDeleteRoute));

module.exports = router;
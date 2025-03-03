const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");


//Index route
router.get("/", warpAsync(listingController.index));
//New route 
router.get("/new", isLoggedIn, listingController.renderNewForm);
//show route
router.get("/:id", warpAsync(listingController.renderShowRoute));
//Create Route
router.post("/", validateListing, isLoggedIn,
    warpAsync(listingController.renderPostRoute)
);
//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(listingController.renderEditRoute));

//Update Route
router.put("/:id/", validateListing, isLoggedIn, isOwner, warpAsync(listingController.renderUpdateRoute));

//Delete Route

router.delete("/:id", isLoggedIn, isOwner, warpAsync(listingController.renderDeleteRoute));

module.exports = router;
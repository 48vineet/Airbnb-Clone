const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(warpAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing,
        warpAsync(listingController.renderPostRoute)
    );


//New route 
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(warpAsync(listingController.renderShowRoute))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, warpAsync(listingController.renderUpdateRoute))
    .delete(isLoggedIn, isOwner, warpAsync(listingController.renderDeleteRoute));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(listingController.renderEditRoute));



module.exports = router;
const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route("/")
    .get(warpAsync(listingController.index))
    // .post(validateListing, isLoggedIn,
    //     warpAsync(listingController.renderPostRoute)
    // );
    .post(upload.single('avatar'), (req, res) => {
        res.send(req.body);
    });

//New route 
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(warpAsync(listingController.renderShowRoute))
    .put(validateListing, isLoggedIn, isOwner, warpAsync(listingController.renderUpdateRoute))
    .delete(isLoggedIn, isOwner, warpAsync(listingController.renderDeleteRoute));



//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(listingController.renderEditRoute));



module.exports = router;
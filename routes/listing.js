const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");



//Index route
router.get("/", warpAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//New route 

router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

//show route
router.get("/:id", warpAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author",
        }
    }).populate("owner");
    console.log("Listing Reviews:", listing.reviews);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        // res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));

//Create Route

router.post("/", validateListing, isLoggedIn,
    warpAsync(async (req, res, next) => {

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        console.log("New Review Before Save:", review);
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    })
);

//Edit Route

router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        // res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id/", validateListing, isLoggedIn, isOwner, warpAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You dont have permission to edit");
        return res.redirect(`/listings/${id}`);
    }


    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated Succesfully!");
    res.redirect(`/listings/${id}`);
}));

//Delete Route

router.delete("/:id", isLoggedIn, isOwner, warpAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;
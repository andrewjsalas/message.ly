// User information routes
const Router = require("express").Router;
const User = require("../models/user");
const { ensureLoggedIn, EnsureCorrectUser } = require("../middleware");
const { json } = require("body-parser");
const router = new Router();

// Get list of users
router.get("/", ensureLoggedIn, async function (req, res, next) {
    try {
        let users = await User.all();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});

// Get details of users
router.get('/:username', EnsureCorrectUser, async function (req, res, next) {
    try {
        let user = await User.get(req.param.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
})

// Get messages to the user
router.get("/:username/to", EnsureCorrectUser, async function (req, res, next) {
    try {
        let messages = await User.messagesTo(req.params.username);
        return res.json({ message });
    } catch (err) {
        return next(err)
    }
});

// Get messages from the user
router.get("/:username/from", EnsureCorrectUser, async function (req, res, next) {
    try {
        let messages = await User.messagesFrom(req.params.username);
        return res.json({ message });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
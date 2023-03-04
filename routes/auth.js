// Authentication Routes (login/logout)
const jwt = require("jsonwebtoken");
const Router = require("express").Router;
const router = new Router();
const User = require("../models/user");
const {SECRET_KEY} = require("../config");
const ExpressError = require("../expressError");


// User login route
// If incorrect login, throw error. 
router.post("/login", async function (req, res, next) {
    try {
        let { username, password } = req.body;
        if (await User.authenticate(username, password)) {
            let token = jwt.sign({ username }, SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({ token });
        } else {
            throw new ExpressError("Invalid username or password", 400);
        }
    } catch (err) {
        return next(err);
    }
})

// Register new user route
router.post("/register", async function (req, res, next) {
    
    try {
        let { username } = await User.register(req.body);
        let token = jwt.sign({ username }, SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.json({ token }); 
    } catch (err) {

        return next(err);
    }
});

module.exports = router;

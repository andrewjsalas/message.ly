const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/auth");

const ExpressError = require("./expressError")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Allow connections to all routes from any browser
app.use(cors());

// Get auth token for all routes
app.use(authenticateJWT);

// Routes //
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);


// 404 Handler //
app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

// General Error Handler //
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;

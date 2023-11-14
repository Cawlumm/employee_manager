const passport = require("passport");
const User = require("../../models/user.mongo");
const jwt = require("jsonwebtoken");

// Function to register a new user
async function registerUser(req, res) {
  try {
    // Validate that email and username exist in the request body
    const { email, username, password,  } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, username, and password are required.",
      });
    }
    // Retrieve the latest user to generate a new userId
    const latestUser = await User.findOne(
      {},
      { userId: 1 },
      { sort: { userId: -1 } }
    );
    const userId = latestUser ? latestUser.userId + 1 : 0;

    // Create a new user object with the generated userId and provided user data
    const newUser = new User({
      userId,
      email: req.body.email,
      username: req.body.username,
    });

    // Register the user using passport-local-mongoose's register method
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        // Handle registration error
        return res.status(404).json({
          success: false,
          message: "Your account could not be saved. Error: " + err,
        });
      } else {
        // Log in the user after successful registration
        req.login(user, (er) => {
          if (er) {
            return res.status(404).json({ success: false, message: er });
          } else {
            return res
              .status(200)
              .json({ success: true, message: "Your account has been saved" });
          }
        });
      }
    });
  } catch (error) {
    // Handle unexpected errors during user registration
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Function to handle user login
function loginUser(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // Handle authentication error
      return res.status(500).json({ success: false, message: err });
    }
    if (!user) {
      // Handle invalid username or password
      return res
        .status(401)
        .json({ success: false, message: "Username or password incorrect" });
    }

    // Log in the user and issue a JWT token for authentication
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }
      // Generate JWT token with a 2-hour expiration time
      const expirationTime = 2 * 60 * 60 * 1000; // 2 hours
      const token = jwt.sign({ user: user }, "secretkey");
      // Set the JWT token as a cookie and respond with a success message
      return res
        .cookie("jwtToken", token, {
          httpOnly: true,
          secure: true,
          SameSite: "none",
          expires: new Date(Date.now() + expirationTime),
        })
        .status(200)
        .json({ success: true, message: "Logged in successfully" });
    });
  })(req, res, next);
}

// Middleware to verify the JWT token
function verifyToken(req, res, next) {
  const token = req.cookies.jwtToken;

  if (!token) {
    // No token provided, unauthorized access
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify the JWT token and extract user information
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      // Invalid token, unauthorized access
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    // Attach user information to the request for further processing
    req.user = decoded.user;
    next();
  });
}

// Function to logout the user
function logoutUser(req, res) {
  // Clear the JWT token cookie on logout
  res
    .clearCookie("jwtToken")
    .status(200)
    .json({ message: "Logged out successfully" });
}

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  logoutUser,
};

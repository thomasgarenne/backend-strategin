const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth");

const rateLimiter = require("express-rate-limit");

// ajouter message pour afficher un flash message
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
	message: 'Too many requests from this IP, please try again after 15 minutes',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	skipSuccessfulRequests: true,
	requestWasSuccessful: (req, res) => res.statusCode < 400,
})

router.post('/', userController.register);
router.post('/login', limiter, userController.login);
router.get('/users', auth, userController.users);

module.exports = router;

const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const userController = require("../controllers/userController.js");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("first name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters long"),
  ],
  userController.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
],
 userController.loginUser
)

module.exports = router;

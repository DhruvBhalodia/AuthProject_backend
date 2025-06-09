const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const { validate } = require('../../middleware/authMiddleware');
const { signupSchema, loginSchema } = require('./auth.validation');

router.post('/signup', validate(signupSchema), controller.signup);
router.post('/login', validate(loginSchema), controller.login);

module.exports = router;

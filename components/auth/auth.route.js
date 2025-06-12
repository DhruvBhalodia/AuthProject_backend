const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const { validate, verifyToken } = require('../../middleware/authMiddleware');
const { signupSchema, loginSchema } = require('./auth.validation');

router.post('/signup', validate(signupSchema), controller.signup);
router.post('/login', validate(loginSchema), controller.login);
router.post('/logout', controller.logout);
router.post('/refresh', controller.refresh);
router.get('/product', verifyToken, controller.product);

module.exports = router;

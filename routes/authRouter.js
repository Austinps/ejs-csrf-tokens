import express from 'express';
import { login, register } from '../controllers/authController.js';
import { renderLogin, renderRegister } from '../controllers/viewController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
// Define a route for the login page
router.get('/login', renderLogin);

// Define a route for the register page
router.get('/register', renderRegister);
export default router;

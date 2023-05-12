// Import dependencies and middleware
import express from 'express';
import { verifyAccessToken } from '../middleware/auth.js';
import ejs from 'ejs';

// Create a router instance
const router = express.Router();

// Define a protected route that requires authentication
router.get('/protected', verifyAccessToken, async (req, res, next) => {
  // Render the EJS view called 'protected'
  try {
    res.render('protedcted');
  } catch (error) {
    next(error);
  }
});

// Export the router
export default router;

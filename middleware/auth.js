import { verifyJWT } from '../helpers/jwt.js';
import createError from 'http-errors';

export const verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new createError.Unauthorized(
        'Missing or invalid authorization header'
      );
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = await verifyJWT(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    next(err);
  }
};

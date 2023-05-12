import mongoose from 'mongoose';
import { hashPassword, comparePassword } from '../helpers/hashing.js';
import { signJWT } from '../helpers/jwt.js';

const { Schema, model } = mongoose;
const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshTokens: [{ type: String }],
});

userSchema.pre('save', async function () {
  this.password = await hashPassword(this.password);
});

userSchema.method('authenticate', async function (clearTextPassword) {
  return await comparePassword(clearTextPassword, this.password);
});

userSchema.method('generateAccessToken', async function () {
  return await signJWT({ id: this._id, type: 'auth' }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
});

userSchema.method('generateRefreshToken', async function () {
  return await signJWT({ id: this._id, type: 'auth' }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
});

userSchema.static('verifyAccessToken', async function (token) {
  try {
    const decodedToken = await verifyJWT(token, process.env.JWT_SECRET);
    return await this.findById(decodedToken.id);
  } catch (err) {
    throw new createError.Unauthorized();
  }
});

const User = model('User', userSchema);
export default User;

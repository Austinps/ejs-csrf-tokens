import User from '../models/User.js';

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    // Create a new user
    const user = await User.create({ email, password });

    // Generate access token
    const accessToken = await user.generateAccessToken();

    // Generate refresh token
    const refreshToken = await user.generateRefreshToken();

    // Save the refresh token in the database
    user.refreshTokens.push(refreshToken);
    await user.save();

    // Send the access token and refresh token in the response
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Validate password
    const validPassword = await user.authenticate(password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate access token
    const accessToken = await user.generateAccessToken();

    // Generate refresh token
    const refreshToken = await user.generateRefreshToken();

    // Save the refresh token in the database
    user.refreshTokens.push(refreshToken);
    await user.save();

    // Send the access token and refresh token in the response
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function revokeRefreshTokens(req, res) {
  try {
    const { userId } = req.user;

    // Find the user by id and remove all refresh tokens
    const user = await User.findById(userId);
    user.refreshTokens = [];
    await user.save();

    res.status(200).send('Refresh tokens revoked');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate a secret key
const secret = speakeasy.generateSecret({ length: 20 });

// Create a QR code that the user can scan
QRCode.toDataURL(secret.otpauth_url, (err, image) => {
  if (err) {
    console.error(err);
  } else {
    console.log(image);
  }
});
const verified = speakeasy.totp.verify({
  secret: 'MY_SECRET_KEY',
  encoding: 'base32',
  token: '123456',
  window: 6,
});

if (verified) {
  // Two-factor authentication succeeded
} else {
  // Two-factor authentication failed
}

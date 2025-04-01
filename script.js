const jwt = require('jsonwebtoken');
require('dotenv').config()
// Secret key (should be kept secure, use environment variables in production)
const secretKey = process.env.secretKey

// 1. Encrypt function to generate a JWT with expiry
const encrypt = (payload) => {
  // Generate a JWT token with the provided payload and secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token will expire in 1 hour
  return token;
};

// 2. Verify function to check if the token is expired and decode it
const verifyJWT = (token) => {
  try {
    // Verify the token using jwt.verify() method
    const decoded = jwt.verify( token, secretKey);
    console.log('Decoded Payload:', decoded);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('Error: Token has expired');
    } else {
      console.log('Error: Invalid token');
    }
  }
};

// 3. Test the process
const payload = { username: 'johnDoe', role: 'admin' };

// Step 1: Generate JWT
const token = encrypt(payload);
console.log('Generated JWT Token:', token);

// Step 2: Verify the JWT
verifyJWT(token);

// Optional: You can add a delay here (e.g., setTimeout) to test token expiry after 1 hour or change the expiration time to test faster.

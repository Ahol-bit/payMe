// pages/api/login.js

// Example of a simple login API endpoint

export default function handler(req, res) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Example: Validate the user's credentials (replace with your authentication logic)
    if (email === 'user@example.com' && password === 'password') {
      // Successful login
      return res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      // Invalid credentials
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } else {
    // Method Not Allowed
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

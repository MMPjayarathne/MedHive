export function isAdmin(auth){
    // Get the token from the Authorization header
  const token = auth.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided!');
  }
  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.secret); // Make sure JWT_SECRET is set in your environment variables
    // Check if the user is an admin
    if (!decoded.isAdmin) {
      return res.status(403).send('Access Denied: You are not authorized to access this resource!');
    }
    return true;
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}
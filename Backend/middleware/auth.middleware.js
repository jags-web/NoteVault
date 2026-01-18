import jwt from "jsonwebtoken";

const protectRoute = (req, res, next) => {
  try {
    // Step 1: cookie se token nikala
    const token = req.cookies.token;

    // Agar token hi nahi hai
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Step 2: token verify kiya
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 3: userId request ke andar daal di
    req.userId = decoded.id;

    // Next controller ko jane diya
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default protectRoute;

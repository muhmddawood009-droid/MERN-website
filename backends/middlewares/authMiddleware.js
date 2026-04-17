import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not Authorized", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", success: false });
  }
};

export const adminOnly = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not Authorized", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    if (req.admin.email === process.env.ADMIN_EMAIL) {
      next();
    } else {
      res.status(403).json({ message: "Access denied", success: false });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token", success: false });
  }
};

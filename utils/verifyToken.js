import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  if (!token) {
    throw new Error("Not authorized, token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Not authorized, invalid token");
  }
};

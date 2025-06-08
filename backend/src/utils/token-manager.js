import jwt from "jsonwebtoken"
export const createToken = (id,email,expiresIn)=>{
    const payload = {id,email}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn
    })
    return token;
}

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.signedCookies['auth-cookie'];

    if (!token || token.trim() === "") {
      return res.status(401).json({ message: "Token Not Received" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwtData = decoded;
    return next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Token Expired or Invalid" });
  }
};


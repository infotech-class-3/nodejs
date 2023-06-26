// middleware
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const headerAuth = req.headers["authorization"];
  if (!headerAuth) {
    return res.status(403).json({ message: "No token data." });
  }
  const token = headerAuth.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN || "cok_gizli_sifre_1234",
    (err, data) => {
      if (err) {
        return res.status(403).json({ message: "Unauthorized user..", err });
      }

      next();
    }
  );
};

module.exports = auth;

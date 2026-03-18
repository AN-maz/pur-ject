import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];


  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Akses ditolak! kamu belum login (Token tidak ada)",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: false,
        message: "Token tidak valid atau kadaluarsa",
      });
    }

    req.user = decoded;
    next();
  });
};

export const onlyAdmin = (req, res, next) => {
  const allowedRoles = ["super_admin", "admin_divisi","admin_hum_in"];

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      status: false,
      message: "Akses ditolak! Area Admin Only!",
    });
  }
  next();
};

export const onlyHumaniora = (req,res,next) => {
  const allowedRoles = ["super_admin","admin_hum_in"];

  if(!allowedRoles.includes(req.user.role)){
    return res.status(403).json({
      status:false,
      message: "Akses DItolak! Khusus Admin humaniora internal"
    });
  }
  next();
}

export const onlyPengurus = (req,res,next) => {
  const pengurusRoles = ["super_admin","admin_hum_in"];

  if(!pengurusRoles.includes(req.user.role)){
    return res.status(403).json({
      status:false,
      message: "Sorry ye.. ini rapat internal pengurus!"
    });
  }
  next();
}
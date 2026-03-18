import * as userService from "../services/userService.js";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id_akun;

    const userProfile = await userService.getUserProfile(userId);

    res.status(200).json({
      status: true,
      message: "Berhasil mengambil data profile",
      data: userProfile,
    });
  } catch (err) {
    const statusCode =
      err.message === "Profile user tidak ditemukan!" ? 404 : 500;
    res.status(statusCode).json({
      status: false,
      message: err.message,
    });
  }
};

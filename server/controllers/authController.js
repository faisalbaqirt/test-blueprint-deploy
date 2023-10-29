const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require('../config/auth')

const register = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.registerUser(username, email, hashedPassword);
    res.status(201).json({
      id: user[0].id,
      username: user[0].username,
      message: "User registration successfully!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await userModel.loginByUsername(username);

    if (!user) {
      return res.json({
        message: "User Not Found",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        message: "Wrong Password!",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      auth.jwt.secretKey
    );

    return res.json({
      id: user.id,
      username: user.username,
      accessToken: accessToken,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const profile = (req, res) => {
    res.json(req.user)
}

// controllers/authController.js
const editProfile = async (req, res) => {
  try {
    const { username } = req.body; // Ambil data yang ingin diubah (misalnya, username)

    // Update data profil pengguna di database
    await userModel.editProfile(req.params.id, username);

    res.status(200).json({ message: 'Profil berhasil diubah' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengedit profil' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await userModel.getAllUsers();
    res.json({ status: 200, data });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

const getUserById = async (req, res) => {
  try {
    const data = await userModel.getUserById(req.params.id);
    if (!data) {
      res.json({ status: 404, message: "Produk tidak ditemukan!" });
    }
    res.json({ status: 200, data });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = await userModel.deleteUser(req.params.id);
    res
      .status(201)
      .json({ status: 201, message: "Produk berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

module.exports = {
  register,
  login,
  profile,
  editProfile,
  getAllUsers,
  getUserById,
  deleteUser
}

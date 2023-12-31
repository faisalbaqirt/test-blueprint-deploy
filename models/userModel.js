const db = require("../db/db");

const registerUser = (username, email, hashedPassword) => {
  return db("users").returning(["id", "username"]).insert({
    username: username,
    email: email,
    password: hashedPassword,
  });
};

const loginByUsername = (username) => {
  return db("users").where("username", username).first();
};

const editProfile = async (id, username, email, name, password, photo) => {
  try {
    await db("users").where("id", id).update({
      username: username,
      email: email,
      name: name,
      password: password,
      photo: photo,
    });
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const data = await db.select("*").from("users");
    return data;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const data = await db.select("*").from("users").where("id", id).first();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const result = await db("users").where("id", id).delete().returning("id");
    return result[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  loginByUsername,
  editProfile,
  getAllUsers,
  getUserById,
  deleteUser,
};

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const findUser = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id).select('-password');
};

const createUser = async (data) => {
  return await User.create(data);
};

module.exports = {
  User,
  findUser,
  findUserById,
  createUser
};

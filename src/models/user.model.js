const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
  }, { timestamps: true }
);


userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  if (!email) {
    return false;
  }
  const user = await this.findOne({
    email: { $ne: null, $ne: '' },
    email,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};


userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};


const User = mongoose.model('User', userSchema); 

module.exports = { User };

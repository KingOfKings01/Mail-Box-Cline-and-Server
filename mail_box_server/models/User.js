import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const SALT = process.env.SALT;
    const salt = await bcrypt.genSalt(parseInt(SALT));
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Pre-update hook to hash password if it is changed
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    const SALT = process.env.SALT;
    const salt = await bcrypt.genSalt(parseInt(SALT));
    update.password = await bcrypt.hash(update.password, salt);
  }
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method to generate JWT
userSchema.statics.generateToken = function (user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    //// { expiresIn: "24h" } // Token will expire in 24 hours
  );
};

// Static method to verify JWT
userSchema.statics.verifyToken = function (token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // Handle token verification failure
  }
};

export const User = mongoose.model("User", userSchema);
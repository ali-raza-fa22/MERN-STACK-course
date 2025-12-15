import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String,
    // required for local accounts (when no googleId)
    required: function () {
      return !this.googleId;
    },
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  // OAuth fields
  googleId: { type: String, index: true },
  displayName: { type: String },
  email: { type: String, index: true },
});

// Hash password before saving

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  if (!this.password) return Promise.resolve(false);
  return compare(candidatePassword, this.password);
};

export default model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ApplySchema = new mongoose.Schema(
    {
      fullname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    //   isAdmin: { type: Boolean, default: false },
    avatar: {
        type: String,
      },
      cloudinary_id: {
        type: String,
      }, 
    },
    {
      timestamps: true,
    }
  );
  
  // Match user entered password to hashed password in database
  ApplySchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Encrypt password using bcrypt
  ApplySchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
const Apply =  mongoose.model("Apply", ApplySchema);

module.exports = Apply;
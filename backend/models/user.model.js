// Import mongoose package
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

// Create a new mongoose schema instance
const Schema = mongoose.Schema;

// Define the user schema with fields and their types
const userSchema = new Schema({
    // Full name of the user
    fullName: { type: String },

    // Email address of the user
    email: { type: String },

    // Password for the user's account (should be stored securely)
    password: { type: String },

    // Date when the user was created, defaults to the current timestamp
    createdOn: { type: Date, default: new Date().getTime() },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

// Export the User model based on the userSchema
module.exports = mongoose.model("user", userSchema);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		trim: true,
		lowercase: true,
		validate: {
			validator: (value) => {
				const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{2,}$/;
				return regex.test(value);
			},
			message: "Invalid email format",
		},
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		validate: {
			validator: (value) => {
				const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z]).{12,}$/;
				return regex.test(value);
			},
			message: "Invalid password format",
		},
	},
	authToken: {
		type: String,
		default: null,
	},
});

// Middleware pour hasher le mot de passe et le sauvegarer
UserSchema.pre("save", async function() {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
	}
});

// Méthode pour vérifier le mot de passe
UserSchema.methods.comparePassword = async function (providedPassword) {
	try {
	  const isMatch = await bcrypt.compare(providedPassword, this.password);
	  return isMatch;
	} catch (error) {
	  throw error;
	}
};

module.exports = mongoose.model('User', UserSchema);
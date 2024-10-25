import { User } from "../models/User.js";

// Create a new User
export const createUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the or email already exists
      const existingUser = await User.findOne({
        email: email,

      });
  
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      // Create a new user (password encryption is handled in the pre-save hook)
      const user = new User({
        email,
        password,
      });
  
      await user.save();
  
      // Generate a JWT token
      const token = User.generateToken(user);
  
      res.status(200).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
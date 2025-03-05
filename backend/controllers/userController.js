import userModel from "../modals/userModel.js";
import validator from "validator"; // Correct import
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Add expiry for security
};

// Route for user login
const logInUser = async (req, res) => {
  // To be implemented
  try {
    const { email, password } = req.body;

    // Checking if the user already exists
   const user = await userModel.findOne({ email });
   if (!user) {
    return res.status(404).json({ message: "User not found" });
   }

   const isMatch=await bcrypt.compare(password,user.password);

   if(isMatch){
    const token=createToken(user._id);
    res.json({success:true,token})
   }
   else{
    res.json({success:false,message:"Invalid Credentials"})
   }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if the user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validating email and password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name:name,
      email:email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token, user: { name: user.name, email: user.email } });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Route for admin login
const adminLogIn = async (req, res) => {
  // To be implemented
  try {
    const {email,password}=req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
      const token=jwt.sign(email+password,process.env.JWT_SECRET);
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"invalid credentials"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
    
  }
};

export { logInUser, registerUser, adminLogIn };

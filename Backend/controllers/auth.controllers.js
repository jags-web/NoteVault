import generateToken from "../config/token.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

// Signup Controller
export const signup = async(req, res) => {
  try {
    const { name, userName, email, password } = req.body;

    // 1. Validation
    if (!name || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. User exists?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

     // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword
    });
 
    // 5. Generate token
    let token= generateToken(user._id)
    
    // 6. Set cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
     })

    return res.status(201).json({user:{
        name,
        userName,
        email
  }});


  } catch (error) {
     return res.status(500).json({ message: "Server error" })
  }
}

// Login Controller
export const login = async(req,res) =>{

    try {
        const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. User exists?
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // 3. Password match?
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. Generate token
    let token= generateToken(existingUser._id)
    
   // 5. Set cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
     })


    // 6. Response
    return res.status(200).json({
      message: "Login successful",
      user: {
        name: existingUser.name,
        userName: existingUser.userName,
        email: existingUser.email
      }
    });

    } catch (error) {
         return res.status(500).json({ message: "Server error" }) 
    }
}

export const logout = async(req, res) =>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logout successful"})

    } catch (error) {
        return res.status(500).json({ message: "Server error" }) 
    }
}

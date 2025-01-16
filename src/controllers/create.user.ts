import { Request, Response } from "express";
import { User } from "../db/models";
import bcrypt from "bcrypt";

// Create a user (Register API)
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, username, user_role } = req.body;

    // Validate the input
    if (!username || !email || !password || !user_role) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email, role: user_role } });
    if (existingUser) {
      res.status(409).json({ message: "Email already registered." });
      return;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: user_role,
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
    return;
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};

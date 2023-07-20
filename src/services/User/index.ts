import user from "./models/userModel";
import { logger } from "../../core/logger";
import User from "../User/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtSecret } from "../../config";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    console.log("user", user);
    return user;
  } catch (e) {
    logger.error(e);
  }
};

export const registerUser = async (
  email: string,
  password: string,
  userName: string
) => {
  try {
    const userFound = await getUserByEmail(email);
    if (userFound) {
      return false;
    }

    const user = new User({ email, password, userName });
    await user.save();
    return true;
  } catch (e) {
    logger.error(e);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      const err = new Error("user not found");
      throw err;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      jwtSecret as string,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (err: any) {
    throw Error(err.message);
  }
};

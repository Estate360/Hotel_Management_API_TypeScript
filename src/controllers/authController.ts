import Joi from "joi";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import { User } from "../models/user";
import { IUserDoc } from "../interfaces/userInterface";
import AppErrorHandler from "../utils/AppErrorHandler";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

interface MyTokenPayload extends JwtPayload {
  // Define any additional properties for the token payload
  userId: string;
}
async function verifyToken(token: string): Promise<MyTokenPayload> {
  const secret = process.env.JWT_SECRET as string;
  const decoded = jwt.verify(token, secret) as MyTokenPayload;
  return await decoded;
}

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const appError = new AppErrorHandler("User already exists!", 409);
      res.status(appError.statusCode).json({
        status: appError.status,
        message: appError.message,
      });
      return;
    }

    // Create new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: req.body.role,
    });
    newUser.password = undefined;
    newUser.confirmPassword = undefined;

    // Return token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log(token);

    res.status(201).json({
      message: "User successfully created.",
      token,
      data: {
        newUser,
      },
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // Check if user exists
    const user: IUserDoc | null = await User.findOne({ email }).select(
      "+password"
    );
    if (!user) {
      const appError = new AppErrorHandler("Invalid email or password!", 401);
      res.status(appError.statusCode).json({
        status: appError.status,
        message: appError.message,
      });
      return;
    }

    // Check password
    const matchPassword = await bcrypt.compare(password, user.password!);
    if (!matchPassword) {
      const appError = new AppErrorHandler("Invalid email or password!", 401);
      res.status(appError.statusCode).json({
        status: appError.status,
        message: appError.message,
      });
      return;
    }

    //If all is correct, return token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    user.password = undefined;

    res.json({ token });
  }
);

export const protect = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    // 1) Get token and check if it exist
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(token);
    if (!token) {
      const appError = new AppErrorHandler(
        "You are not logged in, please provide your token to gain access",
        401
      );
      res.status(appError.statusCode).json({
        status: appError.status,
        message: appError.message,
      });
      return;
    }
    //2) Verification token
    const decoded = await verifyToken(token);
    console.log(decoded.userId); // Prints the user ID from the token payload

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      const appError = new AppErrorHandler(
        "The user belonging to this token does no longer exist.",
        401
      );
      res.status(appError.statusCode).json({
        status: appError.status,
        message: appError.message,
      });
      return;
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  }
);

export const restrictTo =
  (role: string) => (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!role.includes(req.user.role)) {
      const appError = new AppErrorHandler(
        "You do not have permission to perform this action",
        403
      );
      res.status(appError.statusCode).json({
        status: appError.status,
        message: appError.message,
      });
      return;
    }
    next();
  };

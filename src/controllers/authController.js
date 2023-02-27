"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = exports.login = exports.register = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = require("../utils/catchAsync");
const user_1 = require("../models/user");
const AppErrorHandler_1 = __importDefault(require("../utils/AppErrorHandler"));
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return yield decoded;
    });
}
exports.register = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield user_1.userValidator.validateAsync(req.body, {
        abortEarly: false,
    });
    if (error)
        return next(new AppErrorHandler_1.default(error.details[0].message, 400));
    const { email } = req.body;
    // Check if user already exists
    const existingUser = yield user_1.User.findOne({ email });
    if (existingUser) {
        res.status(409).json({ error: "User already exists" });
    }
    // Create new user
    const newUser = yield user_1.User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        role: req.body.role,
    });
    newUser.password = undefined;
    newUser.confirmPassword = undefined;
    // Return token
    const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
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
}));
exports.login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //validate user
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    });
    const { error } = yield schema.validateAsync(req.body, {
        abortEarly: false,
    });
    if (error)
        return next(new AppErrorHandler_1.default(error.details[0].message, 400));
    // Check if user exists
    const user = yield user_1.User.findOne({ email }).select("+password");
    if (!user)
        return next(new AppErrorHandler_1.default("Invalid email or password!", 401));
    // Check password
    const matchPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!matchPassword) {
        return next(new AppErrorHandler_1.default("Invalid email or password!", 401));
    }
    //If all is correct, return token
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    user.password = undefined;
    res.json({ token });
}));
exports.protect = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Get token and check if it exist
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    console.log(token);
    if (!token)
        return next(new AppErrorHandler_1.default("You are not logged in, please provide your token to gain access", 401));
    //2) Verification token
    const decoded = yield verifyToken(token);
    console.log(decoded.userId); // Prints the user ID from the token payload
    // 3) Check if user still exists
    const currentUser = yield user_1.User.findById(decoded.userId);
    if (!currentUser) {
        return next(new AppErrorHandler_1.default("The user belonging to this token does no longer exist.", 401));
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
}));
const restrictTo = (role) => (req, res, next) => {
    if (!role.includes(req.user.role)) {
        return next(new AppErrorHandler_1.default("You do not have permission to perform this action", 403));
    }
    next();
};
exports.restrictTo = restrictTo;

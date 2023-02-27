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
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getOneUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const catchAsync_1 = require("../utils/catchAsync");
const AppErrorHandler_1 = __importDefault(require("../utils/AppErrorHandler"));
const createUser = (req, res) => {
    res.status(500).json({
        status: "error!",
        message: `This route is not defined!, please use ${req.protocol}://${req.get("host")}/api/v1/users/register`,
    });
};
exports.createUser = createUser;
exports.getOneUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findById(req.params.id);
    if (!user) {
        return next(new AppErrorHandler_1.default(`No User found with the ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        status: "success",
        message: "Users successfully fetched",
        result: user.length,
        data: {
            user,
        },
    });
}));
exports.getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.new;
    const user = query
        ? yield user_1.User.find().sort({ _id: -1 }).limit(3)
        : yield user_1.User.find();
    res.status(200).json({
        status: "success",
        message: "All users successfully fetched",
        result: user.length,
        data: {
            user,
        },
    });
}));
exports.updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user)
        return next(new AppErrorHandler_1.default(`User with ID: ${req.params.id} not found!`, 404));
    res.status(200).json({
        message: "user updated successfully",
        status: "success",
        result: user.length,
        data: {
            user,
        },
    });
}));
exports.deleteUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findByIdAndDelete(req.params.id);
    if (!user)
        return next(new AppErrorHandler_1.default(`No user found with the ID: ${req.params.id}. Not deleted!`, 404));
    res.status(200).json({
        message: `user with the ID: ${user} deleted`,
        status: "success",
        data: null,
    });
}));

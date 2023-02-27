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
exports.deleteRoom = exports.updateRoom = exports.findAllRooms = exports.findOneRoom = exports.createRoom = void 0;
const rooms_1 = __importDefault(require("../models/rooms"));
const roomType_1 = __importDefault(require("../models/roomType"));
const AppErrorHandler_1 = __importDefault(require("../utils/AppErrorHandler"));
const catchAsync_1 = require("../utils/catchAsync");
//Create a new Room
exports.createRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomType = yield roomType_1.default.findById(req.body.roomType);
    if (!roomType)
        return next(new AppErrorHandler_1.default("Room type not found, define roomType on the body using it's ID", 404));
    const room = yield (yield rooms_1.default.create(req.body)).populate({
        path: "roomType",
        select: "name",
    });
    res.status(201).json({
        message: "Room created successfully",
        status: "success",
        data: {
            room,
        },
    });
}));
//Find a particular Room
exports.findOneRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield rooms_1.default.findById(req.params.id);
    if (!room)
        return next(new AppErrorHandler_1.default(`The room ID: ${req.params.id} does not exist`, 404));
    res.status(200).json({
        message: "Room found successfully",
        status: "success",
        data: {
            room,
        },
    });
}));
// //Find all Room
exports.findAllRooms = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, roomType, minPrice, maxPrice } = req.query;
    let query = {};
    if (search)
        query.name = { $regex: search, $options: "i" };
    if (roomType) {
        const roomTypeId = yield roomType_1.default.findOne({ name: roomType });
        query.roomType = roomTypeId;
    }
    if (minPrice)
        query.price = { $gte: minPrice };
    if (maxPrice) {
        if (minPrice) {
            query.price.$lte = maxPrice;
        }
        else {
            query.price = { $lte: maxPrice };
        }
    }
    const rooms = yield rooms_1.default.find(query);
    res.status(200).json({
        message: "All Rooms found successfully",
        result: rooms.length,
        status: "success",
        data: {
            rooms,
        },
    });
}));
//Update a Room
exports.updateRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield rooms_1.default.findByIdAndUpdate(req.params.id, req.query, {
        new: true,
        runValidators: true,
    });
    if (!room)
        return next(new AppErrorHandler_1.default(`No room found with the ID: ${req.params.id}`, 404));
    res.status(200).json({
        message: "Room Types Updated successfully",
        status: "success",
        data: {
            room,
        },
    });
}));
//Delete a Room Type
exports.deleteRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield rooms_1.default.findByIdAndDelete(req.params.id);
    if (!room)
        return next(new AppErrorHandler_1.default(`No room found with the ID: ${req.params.id}. Not deleted!`, 404));
    res.status(200).json({
        message: `room with the ID: ${room} deleted`,
        status: "success",
        data: null,
    });
}));

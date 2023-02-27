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
exports.findAllRoomTypes = exports.createRoomType = void 0;
const roomType_1 = __importDefault(require("../models/roomType"));
// import AppErrorHandler from "../utils/AppErrorHandler";
const catchAsync_1 = require("../utils/catchAsync");
//Create a new Room Type
exports.createRoomType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomType = yield roomType_1.default.create(req.body);
    res.status(201).json({
        message: "Room Type created",
        status: "success",
        data: {
            roomType,
        },
    });
}));
//Find all Room Types
exports.findAllRoomTypes = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomTypes = yield roomType_1.default.find();
    res.status(200).json({
        message: "All Room Types found",
        status: "success",
        result: roomTypes.length,
        data: {
            roomTypes,
        },
    });
}));
// //Find a particular Room Type
// export const findOneRoomType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const room = await RoomType.findById(req.params.id);
//   if (!room)
//     return next(
//       new AppErrorHandler(`This room ID: ${req.params.id} does not exist`, 404)
//     );
//   res.status(200).json({
//     message: "Room Type found",
//     status: "success",
//     data: {
//       room,
//     },
//   });
// });
// //Update a Room Type
// export const updateRoomType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const room = await RoomType.findOneAndUpdate(req.params.id, req.query, {
//     new: true,
//     runValidators: true,
//   });
//   if (!room)
//     return next(
//       new AppErrorHandler(`No room found with the ID: ${req.params.id}`, 404)
//     );
//   res.status(200).json({
//     message: "Room Types Updated",
//     status: "success",
//     result: room.length,
//     data: {
//       room,
//     },
//   });
// });
// //Delete a Room Type
// export const deleteRoomType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const room = await RoomType.findOneAndDelete(req.params.id);
//   if (!room)
//     return next(
//       new AppErrorHandler(
//         `No room found with the ID: ${req.params.id}; \ndoes not exit`,
//         404
//       )
//     );
//   res.status(200).json({
//     message: `${room} deleted`,
//     status: "success",
//     data: null,
//   });
// });

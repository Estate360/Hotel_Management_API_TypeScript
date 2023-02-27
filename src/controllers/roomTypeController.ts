import { NextFunction, Request, Response } from "express";
import RoomType from "../models/roomType";
import AppErrorHandler from "../utils/AppErrorHandler";
import { catchAsync } from "../utils/catchAsync";

//Create a new Room Type
export const createRoomType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const roomType = await RoomType.create(req.body);

    res.status(201).json({
      message: "Room Type created",
      status: "success",
      data: {
        roomType,
      },
    });
  }
);

//Find a particular Room Type
export const findOneRoomType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const room = await RoomType.findById(req.params.id);

    if (!room)
      return next(
        new AppErrorHandler(
          `This room ID: ${req.params.id} does not exist`,
          404
        )
      );
    res.status(200).json({
      message: "Room Type found",
      status: "success",
      data: {
        room,
      },
    });
  }
);

//Find all Room Types
export const findAllRoomTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const roomTypes = await RoomType.find();

    res.status(200).json({
      message: "All Room Types found",
      status: "success",
      result: roomTypes.length,
      data: {
        roomTypes,
      },
    });
  }
);

//Update a Room Type
export const updateRoomType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const room = await RoomType.findByIdAndUpdate(req.params.id, req.query, {
      new: true,
      runValidators: true,
    });

    if (!room)
      return next(
        new AppErrorHandler(`No room-type found with the ID: ${req.params.id}`, 404)
      );

    res.status(200).json({
      message: "Room Types Updated",
      status: "success",
      data: {
        room,
      },
    });
  }
);

//Delete a Room Type
export const deleteRoomType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const room = await RoomType.findByIdAndDelete(req.params.id);

    if (!room)
      return next(
        new AppErrorHandler(
          `No room-type found with the ID: ${req.params.id}; \ndoes not exit`,
          404
        )
      );

    res.status(200).json({
      message: `${room} deleted`,
      status: "success",
      data: null,
    });
  }
);

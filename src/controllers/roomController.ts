import { NextFunction, Response, Request } from "express";
import Room from "../models/rooms";
import RoomType from "../models/roomType";
import AppErrorHandler from "../utils/AppErrorHandler";
import { catchAsync } from "../utils/catchAsync";

//Create a new Room
export const createRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const roomType = await RoomType.findById(req.body.roomType);
    if (!roomType)
      return next(
        new AppErrorHandler(
          "Room type not found, define roomType on the body using it's ID",
          404
        )
      );

    const room = await (
      await Room.create(req.body)
    ).populate({
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
  }
);

//Find a particular Room
export const findOneRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const room = await Room.findById(req.params.id);

    if (!room)
      return next(
        new AppErrorHandler(`The room ID: ${req.params.id} does not exist`, 404)
      );
    res.status(200).json({
      message: "Room found successfully",
      status: "success",
      data: {
        room,
      },
    });
  }
);

// //Find all Room
export const findAllRooms = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search, roomType, minPrice, maxPrice } = req.query;

    let query: any = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (roomType) {
      const roomTypeId = await RoomType.findOne({ name: roomType });
      query.roomType = roomTypeId;
    }
    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) {
      if (minPrice) {
        query.price.$lte = maxPrice;
      } else {
        query.price = { $lte: maxPrice };
      }
    }
    const rooms = await Room.find(query);
    res.status(200).json({
      message: "All Rooms found successfully",
      result: rooms.length,
      status: "success",
      data: {
        rooms,
      },
    });
  }
);

//Update a Room
export const updateRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const room = await Room.findByIdAndUpdate(req.params.id, req.query, {
      new: true,
      runValidators: true,
    });

    if (!room)
      return next(
        new AppErrorHandler(`No room found with the ID: ${req.params.id}`, 404)
      );

    res.status(200).json({
      message: "Room Types Updated successfully",
      status: "success",
      data: {
        room,
      },
    });
  }
);

//Delete a Room Type
export const deleteRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room)
      return next(
        new AppErrorHandler(
          `No room found with the ID: ${req.params.id}. Not deleted!`,
          404
        )
      );

    res.status(200).json({
      message: `room with the ID: ${room} deleted`,
      status: "success",
      data: null,
    });
  }
);

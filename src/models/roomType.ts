import mongoose, { Schema } from "mongoose"
import { IRoomType } from "../interfaces/roomTypeInterface";


const roomTypeSchema = new Schema<IRoomType>(
  {
    name: {
      type: String,
      required: [true, "A room type name must be provided!"],
      unique: true,
    },
  },
  {
    timestamps: true,
    // _id: false
  }
);

const RoomType = mongoose.model<IRoomType>("RoomType", roomTypeSchema);

export default RoomType;


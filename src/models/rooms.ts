import mongoose, { Schema } from "mongoose"
import { IRoom } from "../interfaces/roomInterface";


const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: [true, "Please provide a room name!"],
      unique: true,
    },
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: [true, "Please provide a room type!"],
    },
    price: {
      type: Number,
      required: [true, "A room must have a price!"]
    },
  },
  {
    timestamps: true,
  }
);

// remove unique index on price field
// roomSchema.index({ price: 1 }, { unique: false });

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;

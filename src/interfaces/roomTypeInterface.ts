import { Document } from "mongoose";

export interface IRoomType extends Document {
  name: string;
  price: number | {};
  roomType: {} | string | number;
  length: number;
}

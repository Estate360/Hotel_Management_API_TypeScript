import { Document } from "mongoose";

export interface IRoomType extends Document {
  name: string;
  email: string;
  role: string;
  password?: string | any[];
  confirmPassword?: string;
  active: boolean;
  price: number | {};
  roomType: {} | string | number;
}

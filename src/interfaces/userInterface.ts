import { Document } from "mongoose";

export interface IUserDoc extends Document {
  name: string;
  email: string;
  role: string;
  password?: string;
  confirmPassword?: string;
  active: boolean;
  length: number;

}
import { Document } from "mongoose";

export interface IRoom extends Document {
    name: string;
    price: number;
    active: boolean;
    roomType: any[] | {};
    
}
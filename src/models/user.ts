// import Joi from "joi";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUserDoc } from "../interfaces/userInterface";

const userSchema = new Schema<IUserDoc>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["guest", "admin"],
      default: "guest",
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: {},
  }
);

// //PRE-SAVE MIDDLEWARE
userSchema.pre<IUserDoc>("save", async function (next) {
  if (!this.isModified("password")) return next();
  //password hashed with salt 12
  this.password = await bcrypt.hash(this.password!, 12);

  this.confirmPassword = undefined;
  next();
});

// //INSTANCE METHOD DEFINITION;
userSchema.methods.checkCorrectPassword = async function (
  inputtedPassword: string,
  truePassword: string
) {
  return await bcrypt.compare(inputtedPassword, truePassword);
};

// const userValidator = Joi.object({
//   name: Joi.string()
//     .regex(/^\s*\S+(?:\s+\S+)*\s*$/)
//     .min(3)
//     .message("Name must not be below 3 characters!")
//     .required()
//     .lowercase(),
//   // .trim(),
//   email: Joi.string()
//     .email()
//     .required()
//     .label("Email space cannot be empty! Please input your email")
//     .lowercase(),
//   password: Joi.string()
//     .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
//     .min(8)
//     .required(),
//   confirmPassword: Joi.ref("password"),
//   role: Joi.string().valid("guest", "admin").default("guest"),
// });

const User = mongoose.model<IUserDoc>("User", userSchema);

export { User };

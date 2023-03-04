import { NextFunction, Request, Response } from "express";
import Joi, { invalid } from "joi";
import AppErrorHandler from "../utils/AppErrorHandler";

export const userRegistrationValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string()
      .regex(/^\s*\S+(?:\s+\S+)*\s*$/)
      .min(3)
      .message("Name must not be below 3 characters!")
      .required()
      .lowercase(),
    // .trim(),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(8)
      .required(),
    confirmPassword: Joi.ref("password"),
    role: Joi.string().valid("guest", "admin").default("guest"),
  });

  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  console.log("Error has occurred", error);
  if (error) {
    const appError = new AppErrorHandler(error.details[0].message, 400);
    res.status(appError.statusCode).json({
      status: appError.status,
      message: appError.message,
    });
    return;
  }
  next();
};

export const userLoginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //validate user
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const appError = new AppErrorHandler("Invalid field input", 400);
    res.status(appError.statusCode).json({
      status: appError.status,
      message: appError.message,
    });
    return;
  }
  next();
};

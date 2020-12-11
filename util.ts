import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "./config";

export interface IRequest extends Request {
  user?: {
    name?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
  };
}

export const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

export const isAuth = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: "Token is not supplied." });
  }
};

export const isAdmin = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid." });
};

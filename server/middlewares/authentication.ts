//authentication and authorization middleware for the use
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User,{IUser} from "../model/user";
import * as dotenv from "dotenv";

dotenv.config();

interface IRequestWithUser extends Request {
    user: IUser;
  }
  

export const isAuthenticatedUser = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
        message: "Login first to access this resource.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findById((decoded as any).id) as IUser;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

// handling authorizeRoles roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: IRequestWithUser, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not authorized to access this resource`,
          403
        )
      );
    }
    next();
  };
};

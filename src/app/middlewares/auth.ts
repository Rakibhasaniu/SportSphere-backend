import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import { config } from '../config';
import { User } from '../modules/users/user.model';

const auth = (...requiredRoles:any) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.access_secret as string,
    ) as JwtPayload;

    const { id, iat } = decoded;

    // checking if the user is exist
    const user = await User.findById(id);
    console.log(user)

    // if (!user) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    // }






    

   

    // if (requiredRoles && !requiredRoles.includes(role)) {
    //   throw new AppError(
    //     httpStatus.UNAUTHORIZED,
    //     'You are not authorized  hi!',
    //   );
    // }

    // req.user = decoded as JwtPayload & { role: string };
    // next();
  });
};

export default auth;

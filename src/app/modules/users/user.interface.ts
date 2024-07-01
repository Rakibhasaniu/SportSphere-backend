import { USER_ROLE } from "./user.constant";


export type TUser = {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'manager' | 'seller';

  };
  
  export type TUserLogin = {
    email: string;
    password: string;
  };

export type TUserRole = keyof typeof USER_ROLE;
  
  
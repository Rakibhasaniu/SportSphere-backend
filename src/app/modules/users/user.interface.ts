

type TUser = {
    name: string;
    email: string;
    password: string;
    role?: string;
  };
  
  export type TUserLogin = {
    email: string;
    password: string;
  };
  
  export default TUser;
  
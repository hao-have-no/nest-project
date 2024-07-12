export interface User {
  name: string;
  height: number;
  age: number;
  password:string;
  role:string
}

export class CreateUserDto {
  name: string;
  height: number;
  age: number;
  password:string;
  role:string
}

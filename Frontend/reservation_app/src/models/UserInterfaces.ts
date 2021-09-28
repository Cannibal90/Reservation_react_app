export interface UserLogin {
  username: string;
  password: string;
}

export interface UserDetails {
  id: number;
  name: string;
  surname: string;
  age: number;
  city: string;
}

export interface UserRegister {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  age: number;
  city: string;
}

export interface UserResponse {
  id?: number;
  username: string;
  email: string;
  role: string;
  userDetails: UserDetails;
  token?: string;
}

export interface UserRequest {
  username: string;
  email: string;
  role: string;
  detailId: number;
  name: string;
  surname: string;
  age: number;
  city: string;
}

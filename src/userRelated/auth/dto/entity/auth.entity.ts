export class RegisterResponse {
  message?: string;
  token?: string;
}

export class LoginResponse {
  user?: {
    user_id: string;
    email: string;
    username: string;
    role: string;
  };
  message?: string;
  token?: string;
}

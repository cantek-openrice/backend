export class RegisterResponse {
  user?: {
    user_id: string;
    email: string;
    username: string;
    role: string;
    profile_picture_url?: string;
  };
  message?: string;
  token?: string;
}

export class LoginResponse {
  user?: {
    user_id: string;
    email: string;
    username: string;
    role: string;
    profile_picture_url?: string;
  };
  message?: string;
  token?: string;
}

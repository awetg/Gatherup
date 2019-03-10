export interface User {
    user_id?: number;
    username?: string;
    email?: string;
    time_created?: Date;
    avatar?: string;
}

export interface UserInfo {
    file_id: number;
    filename: string;
    filesize: number;
    title: string;
    description: UserInfoDescription;
    user_id: number;
    media_type: string;
    mime_type: string;
    time_added: string;
}

export interface LogInForm {
    username?: string;
    password?: string;
}

export interface SignUpForm {
    full_name?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    intereset?: string[];
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}

export interface RegisterResponse {
  message: string;
  user_id: number;

}

export interface CheckUserResponse {
  username: string;
  available: boolean;
}

export interface UserInfoDescription {
    full_name?: string;
    email?: string;
    interest?: string [];
    avatar?: string;
    events?: number[];
    joinedEvents?: number[];
    favEvents?: number[];
}

export interface UploadResponse {
  message: string;
  file_id: number;
}

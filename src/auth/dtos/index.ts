export * from './LoginDto';
export * from './RegisterDto';

export interface AuthRes {
  accessToken: string;
  refreshToken: string;
}

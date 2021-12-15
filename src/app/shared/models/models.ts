
export type Mode = "signin" | "signup";

export interface ICredentials  {
  email : string;
  password : string;
}

export type Status = 'initial' | 'pending' | 'success' | 'error';

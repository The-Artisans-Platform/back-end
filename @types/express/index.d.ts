import "express-session";

declare module "express-session" {
  export interface SessionData {
    profileId: string;
    email: string;
    role: string;
  }
}

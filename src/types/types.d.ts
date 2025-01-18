import { DecodedToken } from "../middleware/verify.token";

declare global {
  namespace Express {
    interface Request {
      user: DecodedToken;
    }
  }
}

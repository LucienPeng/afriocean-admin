import { Profile } from "../../model/model";

export interface AuthState {
  readonly isLoggedIn: boolean;
  readonly user: Profile | null;
}

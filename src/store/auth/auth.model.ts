import { Profile } from '../../model/compan.model';

export interface AuthState {
  readonly isLoggedIn: boolean;
  readonly user: Profile | null;
}

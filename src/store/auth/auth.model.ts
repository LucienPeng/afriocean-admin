import { Profile } from '../../model/company.model';

export interface AuthState {
  readonly isLoggedIn: boolean;
  readonly user: Profile | null;
}

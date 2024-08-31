import { User } from '../../../types/user';

export interface AuthStore {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;

  setLogin: (token: string, user: User) => void;
  setLogout: () => void;

  login: (token: string, user: User) => void;
  logout: () => void;
}

import { Category, User } from '../domains/wordpress';

/** RootStateモデル */
export interface RootState {
  category: Category[];
  user: User[];
  inputValue: string;
  searchValue: string;
  isLoading: boolean;
}

/** InitialState */
export const rootState: RootState = {
  category: [] as any,
  user: [],
  inputValue: '',
  searchValue: '',
  isLoading: false,
};

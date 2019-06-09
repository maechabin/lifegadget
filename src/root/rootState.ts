import { Category, User } from '../domains/wordpress';

/** RootStateモデル */
export interface RootState {
  /** ブログで使用中のカテゴリー情報一覧 */
  category: Category[];
  /** 投稿しているユーザー情報一覧 */
  user: User[];
  inputValue: string;
  searchValue: string;
  isLoading: boolean;
}

/** InitialState */
export const rootState: RootState = {
  category: [],
  user: [],
  inputValue: '',
  searchValue: '',
  isLoading: false,
};

/** RootStateモデル */
export interface RootState {
  category: {
    index?: any[];
    page?: any;
  }[];
  user: string[];
  inputValue: string;
  searchValue: string;
}

export const rootState: RootState = {
  category: [] as any,
  user: [],
  inputValue: '',
  searchValue: '',
};

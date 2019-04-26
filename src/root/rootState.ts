/** RootStateモデル */
export interface RootState {
  category: {
    index?: any[];
    page?: any;
  }[];
  user: User[];
  inputValue: string;
  searchValue: string;
}

export interface User {
  avatar_urls: any;
  description: string;
  id: number;
  link: string;
  meta: any[];
  name: string;
  slug: string;
  url: string;
  _links: any;
}

/** InitialState */
export const rootState: RootState = {
  category: [] as any,
  user: [],
  inputValue: '',
  searchValue: '',
};

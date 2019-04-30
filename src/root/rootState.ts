/** RootStateモデル */
export interface RootState {
  category: Category[];
  user: User[];
  inputValue: string;
  searchValue: string;
}

export interface Category {
  count: number;
  description: string;
  id: number;
  link: string;
  meta: any[];
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  _links: any;
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

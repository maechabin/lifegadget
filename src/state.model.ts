import { RouterState } from 'connected-react-router';

/** Stateモデル */
export interface State {
  root: RootState;
  index: IndexState;
  archive: ArchiveState;
  router: RouterState;
}

/** RootStateモデル */
export interface RootState {
  category: {
    index?: Index[];
    page?: any;
  }[];
  user: string[];
  inputValue: string;
  searchValue: string;
}

/** IndexStateモデル */
export interface IndexState {
  hasError: boolean;
  index: Index[];
  routingKey: string;
  isHiddenIndexList: boolean;
  tagName: string;
  total: number;
  totalPages: number;
  currentPage: number;
  media: string[];
}

/** 記事一覧 */
export interface Index {
  author: number;
  date: string;
  excerpt: {
    protected: boolean;
    rendered: string;
  };
  featured_media: number;
  id: number;
  link: string;
  slug: string;
  source_url: string;
  title: {
    rendered: string;
  };
  type: string;
  _links: any;
}

/** ArchiveStateモデル */
export interface ArchiveState {
  hasError: boolean;
  article: Article;
  articleImage: string;
  currentId: number;
  tags: string[];
  gettedTag: boolean;
}

/** 記事 */
export interface Article {
  index: Index[];
  page: any;
}

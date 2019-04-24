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
  article: Article | null;
  articleImage: string;
  currentId: number;
  tags: { name: string; slug: string }[];
  hasTagNames: boolean;
}

/** 記事 */
export interface Article {
  author: number;
  categories: number[];
  comment_status: string;
  content: {
    protected: boolean;
    rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
    protected: boolean;
    rendered: string;
  };
  featured_media: number;
  format: string;
  guid: {
    rendered: string;
  };
  id: number;
  link: string;
  meta: any[];
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
    rendered: string;
  };
  type: string;
  _links: any;
}

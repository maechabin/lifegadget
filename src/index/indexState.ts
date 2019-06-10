/** IndexStateモデル */
export interface IndexState {
  hasError: boolean;
  index: Index[];
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
  source_url: string | null;
  title: {
    rendered: string;
  };
  type: string;
  _links: any;
}

export const indexState: IndexState = {
  hasError: false,
  index: [],
  isHiddenIndexList: true,
  tagName: '',
  total: 0,
  totalPages: 1,
  currentPage: 1,
  media: [],
};

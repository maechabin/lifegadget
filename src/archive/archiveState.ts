/** ArchiveStateモデル */
export interface ArchiveState {
  hasError: boolean;
  article: Articles | null;
  articleImage: string;
  currentId: number;
  tags: { name: string; slug: string }[];
  hasTagNames: boolean;
}

export interface Articles {
  [id: number]: Article;
}

export interface Article {
  id: number;
  author: number;
  categories: number[];
  content: string;
  date: string;
  eyecatch: string;
  tags: number[];
  tagNames: number[];
  title: string;
}

/** 記事 */
export interface Archive {
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

export const archiveState: ArchiveState = {
  hasError: false,
  article: null,
  articleImage: '',
  currentId: 0,
  tags: [],
  hasTagNames: false,
};

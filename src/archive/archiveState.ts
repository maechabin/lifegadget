/** ArchiveStateモデル */
export interface ArchiveState {
  hasError: boolean;
  article: Articles | null;
  articleImage: string;
  currentId: number;
  tags: { name: string; slug: string }[];
  hasTagNames: boolean;
}

/** 記事一覧 */
export interface Articles {
  [id: number]: Article;
}

/** 記事 */
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

/** 初期State */
export const archiveState: ArchiveState = {
  hasError: false,
  article: null,
  articleImage: '',
  currentId: 0,
  tags: [],
  hasTagNames: false,
};

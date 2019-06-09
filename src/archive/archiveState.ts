/** ArchiveStateモデル */
export interface ArchiveState {
  hasError: boolean;
  article: Articles | undefined;
  currentId: number;
}

/** 記事一覧 */
export interface Articles {
  [id: number]: Article;
}

/** タグ名 */
export interface TagName {
  name: string;
  slug: string;
}

/** 記事 */
export interface Article {
  id: number;
  /** 投稿者ID */
  author: number;
  categories: number[];
  content: string;
  date: string;
  eyecatch: string;
  tags: number[];
  tagNames: TagName[];
  title: string;
}

/** 初期State */
export const archiveState: ArchiveState = {
  hasError: false,
  article: undefined,
  currentId: NaN,
};

export interface State {
  root: RootState;
  index: IndexState;
  archive: ArchiveState;
}

export interface RootState {
  category: string[];
  user: string[];
  inputValue: string;
  searchValue: string;
}

export interface IndexState {
  badRequest: boolean;
  index: string[];
  routingKey: string;
  resetList: boolean;
  tagName: string;
  total: number;
  totalPages: number;
  currentPage: number;
  media: string[];
}

export interface ArchiveState {
  badRequest: boolean;
  article: Article;
  articleImage: string;
  currentId: number;
  tags: string[];
  gettedTag: boolean;
}

export interface Article {}

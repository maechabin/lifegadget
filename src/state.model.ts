export interface State {
  root: RootState;
  index: IndexState;
  archive: ArchiveState;
}

export interface RootState {
  category: {
    index: Index[];
    page: any;
  };
  user: string[];
  inputValue: string;
  searchValue: string;
}

export interface IndexState {
  badRequest: boolean;
  index: Index[];
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
  article: {
    index: Index[];
    page: any;
  };
  articleImage: string;
  currentId: number;
  tags: string[];
  gettedTag: boolean;
}

export interface Article {}

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

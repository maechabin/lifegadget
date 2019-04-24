import { RootState, IndexState, ArchiveState } from './state.model';

export const rootState: RootState = {
  category: [] as any,
  user: [],
  inputValue: '',
  searchValue: '',
};

export const indexState: IndexState = {
  hasError: false,
  index: [],
  routingKey: '',
  isHiddenIndexList: true,
  tagName: '',
  total: 0,
  totalPages: 1,
  currentPage: 1,
  media: [],
};

export const archiveState: ArchiveState = {
  hasError: false,
  article: null,
  articleImage: '',
  currentId: 0,
  tags: [],
  hasTagNames: false,
};

import { RootState, IndexState, ArchiveState } from './state.model';

export const rootState: RootState = {
  category: {} as any,
  user: [],
  inputValue: '',
  searchValue: '',
};

export const indexState: IndexState = {
  badRequest: false,
  index: [],
  routingKey: '',
  resetList: true,
  tagName: '',
  total: 0,
  totalPages: 1,
  currentPage: 1,
  media: [],
};

export const archiveState: ArchiveState = {
  badRequest: false,
  article: {} as any,
  articleImage: '',
  currentId: 0,
  tags: [],
  gettedTag: false,
};

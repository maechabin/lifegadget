import Root from './root/RootContainer';
import Index from './index/containers/IndexContainer';
import Archive from './archive/ArchiveContainer';
import Search from './index/containers/SearchContainer';
import Category from './index/containers/CategoryContainer';
import Tag from './index/containers/TagContainer';
import Author from './index/containers/AuthorContainer';
import NotFound from './shared/NotFound';

import { fetchIndexAndDispatchSetIndexAsync } from './index/indexAction';
import { fetchArticleAndDispatchSetAsync } from './archive/archiveAction';
import { fetchIndex, fetchArchive } from './domains/wordpress';

export type Route = {
  path?: string;
  component: any;
  fetchData?: any;
};

export const routingArray: Route[] = [
  {
    path: '/',
    component: Index,
    fetchData: (pageNumber: number, dispatch: any) => {
      fetchIndexAndDispatchSetIndexAsync({ fetchMethod: fetchIndex, pageNumber })(dispatch);
    },
  },
  {
    path: '/:page',
    component: Index,
    fetchData: (pageNumber: number, dispatch: any) => {
      fetchIndexAndDispatchSetIndexAsync({ fetchMethod: fetchIndex, pageNumber })(dispatch);
    },
  },
  {
    path: '/archives/:id',
    component: Archive,
    fetchData: (archiveId: number, dispatch: any) => {
      fetchArticleAndDispatchSetAsync({ fetchMethod: fetchArchive, archiveId })(dispatch);
    },
  },
  {
    path: '/search/:keyword',
    component: Search,
  },
  {
    path: '/search/:keyword/:page',
    component: Search,
  },
  {
    path: '/category/:category',
    component: Category,
  },
  {
    path: '/category/:category/:page',
    component: Category,
  },
  {
    path: '/tag/:tag',
    component: Tag,
  },
  {
    path: '/tag/:tag/:page',
    component: Tag,
  },
  {
    path: '/author/:author',
    component: Author,
  },
  {
    path: '/author/:author/:page',
    component: Author,
  },
  {
    component: NotFound,
  },
];

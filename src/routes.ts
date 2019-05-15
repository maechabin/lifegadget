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
  exact?: boolean;
  component: any;
  fetchData?: any;
};

export type Params = {
  page?: string;
  id?: string;
  keyword?: string;
  category?: string;
  tag?: string;
  author?: string;
};

export const routingArray: Route[] = [
  {
    path: '/',
    exact: true,
    component: Index,
    fetchData: (params: Params, dispatch: any) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchIndex,
        pageNumber: 1,
      })(dispatch);
    },
  },
  {
    path: '/:page',
    exact: true,
    component: Index,
    fetchData: (params: Params, dispatch: any) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchIndex,
        pageNumber: Number(params.page),
      })(dispatch);
    },
  },
  {
    path: '/archives/:id',
    exact: true,
    component: Archive,
    fetchData: (params: Params, dispatch: any) => {
      fetchArticleAndDispatchSetAsync({ fetchMethod: fetchArchive, archiveId: Number(params.id) })(
        dispatch,
      );
    },
  },
  {
    path: '/search/:keyword',
    exact: true,
    component: Search,
  },
  {
    path: '/search/:keyword/:page',
    exact: true,
    component: Search,
  },
  {
    path: '/category/:category',
    exact: true,
    component: Category,
  },
  {
    path: '/category/:category/:page',
    exact: true,
    component: Category,
  },
  {
    path: '/tag/:tag',
    exact: true,
    component: Tag,
  },
  {
    path: '/tag/:tag/:page',
    exact: true,
    component: Tag,
  },
  {
    path: '/author/:author',
    exact: true,
    component: Author,
  },
  {
    path: '/author/:author/:page',
    exact: true,
    component: Author,
  },
  {
    component: NotFound,
  },
];

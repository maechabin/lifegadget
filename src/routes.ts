import { Dispatch } from 'redux';

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
import {
  fetchIndex,
  fetchKeywordIndex,
  fetchCategoryIndex,
  fetchTagIndex,
  fetchAuthorIndex,
  fetchArchive,
} from './domains/wordpress';

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
    fetchData: (params: Params, dispatch: Dispatch) => {
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
    fetchData: (params: Params, dispatch: Dispatch) => {
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
    fetchData: (params: Params, dispatch: Dispatch) => {
      fetchArticleAndDispatchSetAsync({ fetchMethod: fetchArchive, archiveId: Number(params.id) })(
        dispatch,
      );
    },
  },
  {
    path: '/search/:keyword',
    exact: true,
    component: Search,
    fetchData: (params: Params, dispatch: Dispatch) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchKeywordIndex,
        pageNumber: 1,
        keyword: params.keyword,
      })(dispatch);
    },
  },
  {
    path: '/search/:keyword/:page',
    exact: true,
    component: Search,
    fetchData: (params: Params, dispatch: Dispatch) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchKeywordIndex,
        pageNumber: Number(params.page),
        keyword: params.keyword,
      })(dispatch);
    },
  },
  {
    path: '/category/:category',
    exact: true,
    component: Category,
    fetchData: (params: Params, dispatch: Dispatch) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchCategoryIndex,
        pageNumber: 1,
        keyword: params.category,
      })(dispatch);
    },
  },
  {
    path: '/category/:category/:page',
    exact: true,
    component: Category,
    fetchData: (params: Params, dispatch: Dispatch) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchCategoryIndex,
        pageNumber: Number(params.page),
        keyword: params.category,
      })(dispatch);
    },
  },
  {
    path: '/tag/:tag',
    exact: true,
    component: Tag,
    fetchData: (params: Params, dispatch: Dispatch) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchTagIndex,
        pageNumber: 1,
        keyword: params.tag,
      })(dispatch);
    },
  },
  {
    path: '/tag/:tag/:page',
    exact: true,
    component: Tag,
    fetchData: (params: Params, dispatch: Dispatch) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchTagIndex,
        pageNumber: Number(params.page),
        keyword: params.tag,
      })(dispatch);
    },
  },
  {
    path: '/author/:author',
    exact: true,
    component: Author,
    fetchData: (params: Params, dispatch: Dispatch) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchAuthorIndex,
        pageNumber: 1,
        keyword: params.author,
      })(dispatch);
    },
  },
  {
    path: '/author/:author/:page',
    exact: true,
    component: Author,
    fetchData: (params: Params, dispatch: Dispatch) => {
      fetchIndexAndDispatchSetIndexAsync({
        fetchMethod: fetchAuthorIndex,
        pageNumber: Number(params.page),
        keyword: params.author,
      })(dispatch);
    },
  },
  {
    component: NotFound,
  },
];

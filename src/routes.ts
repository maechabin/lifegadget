import Root from './containers/RootContainer';
import Index from './containers/IndexContainer';
import Archive from './containers/ArchiveContainer';
import Search from './containers/SearchContainer';
import Category from './containers/CategoryContainer';
import Tag from './containers/TagContainer';
import Author from './containers/AuthorContainer';
import NotFound from './shared/NotFound';

export type Route = {
  path?: string;
  component: any;
};

export const routingArray: Route[] = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/:page',
    component: Index,
  },
  {
    path: '/archives/:id',
    component: Archive,
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

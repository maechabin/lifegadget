import Root from './containers/RootContainer';
import Index from './containers/IndexContainer';
import Archive from './containers/ArchiveContainer';
import Search from './containers/SearchContainer';
import Category from './containers/CategoryContainer';
import Tag from './containers/TagContainer';
import Author from './containers/AuthorContainer';
import NotFound from './components/root/NotFound';

// export const routes = (
//   <Route path="/" component={Root}>
//     <IndexRoute component={Index} />
//     <Route path="/:page" component={Index} />
//     <Route path="/archives/:id" component={Archive} />
//     <Route path="/search/:keyword" component={Search} />
//     <Route path="/search/:keyword/:page" component={Search} />
//     <Route path="/category/:category" component={Category} />
//     <Route path="/category/:category/:page" component={Category} />
//     <Route path="/tag/:tag" component={Tag} />
//     <Route path="/tag/:tag/:page" component={Tag} />
//     <Route path="/author/:author" component={Author} />
//     <Route path="/author/:author/:page" component={Author} />
//     <Route path="*" component={NotFound} />
//   </Route>
// );

// export type Route = {
//   path?: string;
//   exact?: boolean;
//   component: any;
// };

export const routingArray = [
  // {
  //   path: '/',
  //   exact: true,
  //   component: Root,
  // },
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

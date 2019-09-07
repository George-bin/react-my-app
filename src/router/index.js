import Home from '../views/Home/Home';
import Life from '../views/Life/Life';
// import Demo from '../views/Demo/Demo';
import ArticleList from '../components/ArticleList';
import ArticleComponent from '../components/ArticleContent';

const routes = [
  {
    path: '/life',
    component: Life
  },
  {
    path: '/',
    component: Home,
    // 嵌套路由
    routes: [
      {
        path: '/home/articleList/:classifyId/:type',
        component: ArticleList
      },
      {
        path: '/home/article/:articleId',
        component: ArticleComponent
      }
    ]
  }
];

export default routes

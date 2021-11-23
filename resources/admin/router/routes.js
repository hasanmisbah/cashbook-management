import authenticated from '../Middleware/authenticated';
import routeMap from '../utils/routeMap';
import authRoutes from './authRoutes';

export default [
  ...authRoutes,
  {
    path: '/',
    component: () => import('@/Layouts/Admin'),
    children: [
      {
        path: '',
        name: routeMap.home.name,
        component: ()=> import /* webpackChunkName: 'Login' */ ('../views/Dashboard'),
        beforeEnter: authenticated,
        meta: {
          permission: routeMap.home.permission
        }
      },

      {
        path: routeMap.expenseSource.path,
        name: routeMap.expenseSource.name,
        component: ()=> import /* webpackChunkName: 'Login' */ ('../views/ExpenseSource/ExpenseSource'),
        beforeEnter: authenticated,
        meta: {
          permission: routeMap.expenseSource.permission
        }
      }
    ],

  },
];

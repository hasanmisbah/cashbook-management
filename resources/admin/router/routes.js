import authenticated from '../Middleware/authenticated';
import routeMap from '../utils/routeMap';
import authRoutes from './authRoutes';

export default [
  ...authRoutes,
  {
    path: '/admin',
    component: () => import('@/Layouts/Admin'),
    children: [
      {
        path: '',
        name: routeMap.home.name,
        component: ()=> import /* webpackChunkName: 'Dashboard' */ ('../views/Dashboard'),
        beforeEnter: authenticated,
        meta: {
          permission: routeMap.home.permission
        }
      },

      {
        path: routeMap.expenseSource.path,
        name: routeMap.expenseSource.name,
        component: ()=> import /* webpackChunkName: 'Expense Source' */ ('../views/ExpenseSource/ExpenseSource'),
        beforeEnter: authenticated,
        meta: {
          permission: routeMap.expenseSource.permission
        }
      },

      {
        path: routeMap.expense.path,
        name: routeMap.expense.name,
        component: ()=> import /* webpackChunkName: 'Expense Source' */ ('../views/Expense/Expense'),
        beforeEnter: authenticated,
        meta: {
          permission: routeMap.expenseSource.permission
        }
      }
    ],

  },
];

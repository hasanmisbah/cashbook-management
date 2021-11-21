import routeMap from '../utils/routeMap';


export default [
  {
    path: '/',
    component: () => import('@/Layouts/Admin'),
    children: [
      {
        path: '',
        name: routeMap.home.name,
        component: ()=> import /* webpackChunkName: 'Login' */ ('../views/Dashboard'),
        meta: {
          permission: routeMap.home.permission
        }
      }
    ],

  },
  {
    path: routeMap.auth.login.path,
    name: routeMap.auth.login.name,
    component: ()=> import /* webpackChunkName: 'register' */ ('../views/Auth/Login'),
    meta: {
      permission: routeMap.auth.login.permission
    }
  },
  {
    path: routeMap.auth.register.path,
    name: routeMap.auth.register.name,
    component: ()=> import /* webpackChunkName: 'Dashboard' */ ('../views/Auth/Register'),
    meta: {
      permission: routeMap.auth.register.permission
    }
  },
];

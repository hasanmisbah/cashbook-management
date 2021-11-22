import routeMap from '../utils/routeMap';
import guest from '../Middleware/guest';

const authRoutes = [
  {
    path: routeMap.auth.login.path,
    name: routeMap.auth.login.name,
    component: ()=> import /* webpackChunkName: 'register' */ ('../views/Auth/Login'),
    beforeEnter: guest,
    meta: {
      permission: routeMap.auth.login.permission
    }
  },
  {
    path: routeMap.auth.register.path,
    name: routeMap.auth.register.name,
    component: ()=> import /* webpackChunkName: 'Dashboard' */ ('../views/Auth/Register'),
    beforeEnter: guest,
    meta: {
      permission: routeMap.auth.register.permission
    }
  },
];

export default authRoutes

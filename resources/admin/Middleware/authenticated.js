import middleware from './middleware';
import routeMap from '../utils/routeMap';
const { validateUserIsAuthenticated } = middleware()
export default async (to, from, next) => {

  const userIsAuthenticated = await validateUserIsAuthenticated();

  if (userIsAuthenticated) {
    return next();
  }

  return next({ name: routeMap.auth.login.name })
}

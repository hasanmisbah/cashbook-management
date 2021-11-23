import middleware from './middleware';
import routeMap from '../utils/routeMap';

const { validateUserIsAuthenticated } = middleware()
export default async (to, from, next) => {
  const userIsLoggedIn = await validateUserIsAuthenticated()

  if(!userIsLoggedIn){
    return next();
  }

  return next({
    name: routeMap.home.name
  })
}

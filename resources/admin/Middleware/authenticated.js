import middleware from './middleware';
import routeMap from '../utils/routeMap';

export default async (to, from, next) => {

  const validated = await validateRequest();

  if (validated) {
    return next();
  }

  return next({ name: routeMap.auth.login.name })
}

function validateRequest() {

  const { isAuthenticated, isBootstrapped } = middleware()

  if (isBootstrapped.value) {
    return isAuthenticated.value
  }

  return false
}

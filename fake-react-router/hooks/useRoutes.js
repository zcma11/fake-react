export const useRoutes = routes => {
  const matchRoute = window.location.pathname
  return routes.map(route => {
    return matchRoute === route.path ? route.element : null
  })
}

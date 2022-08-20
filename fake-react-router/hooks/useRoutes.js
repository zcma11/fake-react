import { createElement, useContext } from 'react'
import { useLocation } from '.'
import { RouteContext } from '../utils'

export const match = (pathname, routes) => {
  return routes.map(route => {
    const m = pathname.startsWith(route.path)
    if (m && route.children) {
      return route.children.map(child => {
        return pathname === child.path
          ? createElement(
              RouteContext.Provider,
              { value: { outlet: child.element }},
              route.element
            )
          : null
      })
    }

    return null
  })
}

export const useRoutes = routes => {
  const { location } = useLocation()
  // const { matches: parentMatches } = useContext(RouteContext)
  const matchRoute = location.pathname
  console.log('location', location, match(matchRoute, routes))
  return match(matchRoute, routes)
  // const routeMatch = parentMatches[parentMatches.length - 1]

  // return routeMatch
}

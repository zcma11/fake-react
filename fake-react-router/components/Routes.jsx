import React, { isValidElement } from 'react'
import { useRoutes } from '../hooks'
import { formatRoute } from '../utils'

const createRoutesChildren = (parentPath, children) => {
  const routes = []
  React.Children.forEach(children, child => {
    if (!isValidElement(child)) {
      return
    }

    let route = {
      path: child.props.path && formatRoute(parentPath + child.props.path),
      element: child.props.element
    }

    if (child.props.children) {
      route.children = createRoutesChildren(route.path, child.props.children)
    }

    routes.push(route)
  })

  return routes
}

export const Routes = props => {
  const routes = createRoutesChildren('/', props.children)
  console.log(routes)
  return useRoutes(routes)
}

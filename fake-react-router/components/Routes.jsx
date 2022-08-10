import React from 'react'
import { useRoutes } from '../hooks'

export const Routes = props => {
  const routes = []
  React.Children.forEach(props.children, child => {
    let route = {
      path: child.props.path,
      element: child.props.element
    }

    routes.push(route)
  })

  console.log(props)
  return useRoutes(routes)
}
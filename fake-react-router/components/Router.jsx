import { NavigationContext } from '../utils'

export const Router = ({ navigator, children, location }) => {
  return (
    <NavigationContext.Provider value={{ navigator, location }}>
      {children}
    </NavigationContext.Provider>
  )
}

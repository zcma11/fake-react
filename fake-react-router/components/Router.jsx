import { NavigationContext } from '../utils'

export const Router = ({ navigator, children }) => {
  return (
    <NavigationContext.Provider value={navigator}>
      {children}
    </NavigationContext.Provider>
  )
}

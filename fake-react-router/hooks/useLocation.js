import { useContext } from 'react'
import { NavigationContext } from '../utils'

export const useLocation = () => {
  const { location } = useContext(NavigationContext)
  console.log(location)
  return location
}

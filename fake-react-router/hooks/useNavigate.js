import { useContext } from 'react'
import { NavigationContext } from '../utils'

export const useNavigate = () => {
  const { navigator } = useContext(NavigationContext)

  return navigator.push
}

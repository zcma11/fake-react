import { useContext } from 'react'
import { RouteContext } from '../utils'

export const useOutlet = () => {
  return useContext(RouteContext).outlet
}

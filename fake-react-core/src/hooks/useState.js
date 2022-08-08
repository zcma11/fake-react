import {useReducer} from './useReducer'

export const useState = initialState => {
  return useReducer(null, initialState)
}
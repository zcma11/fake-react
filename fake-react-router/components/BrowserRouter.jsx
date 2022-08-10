import { Router } from './Router'
import { createBrowserHistory } from 'history'
import { useRef } from 'react'

export const BrowserRouter = ({ children }) => {
  const historyRef = useRef()

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory()
  }

  const history = historyRef.current
  return <Router children={children} navigator={history} />
}

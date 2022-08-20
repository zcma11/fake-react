import { Router } from './Router'
import { createBrowserHistory } from 'history'
import { useRef } from 'react'
import { useState } from 'react'
import { useLayoutEffect } from 'react'

export const BrowserRouter = ({ children }) => {
  const historyRef = useRef()

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory()
  }

  const history = historyRef.current

  const [state, setState] = useState({ action: null, location: history.location })

  useLayoutEffect(() => {
    return history.listen(setState)
  }, [history])

  return <Router children={children} navigator={history} location={state} />
}

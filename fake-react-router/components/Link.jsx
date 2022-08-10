import { useNavigate } from '../hooks/useNavigate'

export const Link = ({ to, children }) => {
  const navigator = useNavigate()
  const handlerClick = e => {
    e.preventDefault()
    navigator(to)
  }

  return <a onClick={handlerClick}>{children}</a>
}

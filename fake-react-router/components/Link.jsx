import { useNavigate } from '../hooks'

export const Link = ({ to, children }) => {
  const navigator = useNavigate()
  const handlerClick = e => {
    e.preventDefault()
    navigator(to)
  }

  return (
    <a href={to} onClick={handlerClick}>
      {children}
    </a>
  )
}

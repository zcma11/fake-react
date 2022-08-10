import { BrowserRouter, Route, Routes, Link } from 'fake-react-router'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const Layout = () => {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
    </div>
  )
}

const Home = () => {
  return <div>home router</div>
}

const About = () => {
  return <div>about router</div>
}

const NotFound = () => {
  return <div>not found</div>
}

import { BrowserRouter, Route, Routes, Link, Outlet } from 'fake-react-router'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}>
            {/* <Route path="/ok" element={<Ok />}></Route> */}
          </Route>
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
      <Outlet />
    </div>
  )
}

const Ok = () => {
  return <p>ok</p>
}

const Home = () => {
  return <div>
    <div>home router</div>
    {/* <Outlet /> */}
  </div>
}

const About = () => {
  return <div>about router</div>
}

const NotFound = () => {
  return <div>not found</div>
}

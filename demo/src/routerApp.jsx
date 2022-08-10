import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Outlet,
  useParams
} from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>router</h1>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            {/* <Route index element={<Home />} /> */}
            <Route path="/about" element={<About />}>
              <Route path=":id" element={<Detail />}></Route>
            </Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
        <Link to="/about">about</Link>
      </div>
    </BrowserRouter>
  )
}

const NoMatch = () => {
  return <div>404 not found</div>
}

const Layout = () => {
  return (
    <div>
      <p>layout</p>
      <Link to="/home">home</Link>
      <Outlet />
    </div>
  )
}

const Home = () => {
  return <div>home router</div>
}

const About = () => {
  return (
    <div>
      <p>about router</p>
      <Link to="/about/123">123</Link>
      <Outlet />
    </div>
  )
}

const Detail = () => {
  const params = useParams()
  return <div>detail {params.id}</div>
}

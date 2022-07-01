import { React, ReactDOM } from './myReact'
// import App from './App'
import './index.css'
console.log(React, ReactDOM)

function FunctionComponent(props) {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}

class ClassComponent extends React.Component {
  render () {
    return (
      <div>
        <h2>{this.props.name}</h2>
      </div>
    )
  }
}
const jsx = (
  <div>
    <h1 className="red">hello</h1>
    <p>someofs,faoefjowif</p>
    <FunctionComponent name="1"></FunctionComponent>
    <ClassComponent name="2"></ClassComponent>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(jsx
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
)

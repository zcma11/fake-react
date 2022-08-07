import { React, ReactDOM, useReducer } from './myReact'
// import App from './App'
import './index.css'
console.log(React, ReactDOM)

function FunctionComponent(props) {
  const [count, addCount] = useReducer(c => c + 1, 0)
  return (
    <div>
      <button onClick={addCount}>{count}</button>
      <p>{props.name}</p>
    </div>
  )
}

class ClassComponent extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
      </div>
    )
  }
}
const jsx = (
  <div>
    <h1 className="red" onClick={() => console.log(1)}>
      hello
    </h1>
    <p>someofs,faoefjowif</p>
    <FunctionComponent name="1"></FunctionComponent>
    <ClassComponent name="2"></ClassComponent>
    文本
    <>
      <div>123</div>
      <div>456</div>
    </>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  jsx
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
)

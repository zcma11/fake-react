import { React, ReactDOM, useReducer, useState } from './myReact'
// import App from './App'
import './index.css'
console.log(React, ReactDOM)

function FunctionComponent(props) {
  const [count, addCount] = useReducer(c => c + 1, 0)
  const [count1, setCount1] = useState(0)
  return (
    <div>
      <button onClick={() => addCount()}>{count}</button>
      <button onClick={() => setCount1(count1 + 1)}>{count1}</button>
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

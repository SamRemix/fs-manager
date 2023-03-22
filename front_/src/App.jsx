import { memo, useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>fs-manager</h1>
    </div>
  )
}

export default memo(App)

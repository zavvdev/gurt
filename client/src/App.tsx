import { useEffect, useState } from 'react'
import logo from './assets/logo.png'

function App() {
  const [res, setRes] = useState('')

  useEffect(() => {
    fetch('/api/v1/test').then((res) => {
      return res.json().then(setRes)
    })
  }, [])

  return (
    <div>
      <img src={logo} />
      <h1>{res}</h1>
    </div>
  )
}

export default App

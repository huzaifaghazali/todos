import { useState } from 'react'
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseline />
      <h1>Todo</h1>
    </>
  )
}

export default App

import { useState } from 'react'
import CourseBuilder from './CourseBuilder'


function App() {
  const [count, setCount] = useState(0)

  return (
   <CourseBuilder/>
  )
}

export default App

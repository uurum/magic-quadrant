import { useState } from 'react'
import Chart from './Components/Chart/Chart'
import Table from './Components/Table/Table'
import './App.css'
import Header from './Components/Header/Header'
import PointContext from './Context/PointContext'
import { PointModel } from './Models/types'

function App() {
  const [points, setPoints] = useState<PointModel[]>([] as PointModel[])

  return (
    <PointContext.Provider value={{points, setPoints}}>
      <div className="App">
        <Header />
        <div className="content">
          <Chart />
          <Table />
        </div>
      </div>
    </PointContext.Provider>
  )
}

export default App

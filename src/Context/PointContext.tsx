import React, { createContext } from 'react'
import { PointModel } from '../Models/types'

const PointContext = createContext({
  points: [] as PointModel[],
  setPoints: (points: PointModel[]) => {},
})

export default PointContext

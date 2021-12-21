import React, { useContext, useEffect, useRef, useState } from 'react'
import PointContext from '../../Context/PointContext'
import { PointModel } from '../../Models/types'
import Point, { ChartSetting } from '../Point/Point'
import './Chart.css'

const Chart = () => {

  const { points, setPoints } = useContext(PointContext);

  const chartRef = useRef<HTMLDivElement>(null)
  const [wrapperSettings, setwrapperSettings] = useState<ChartSetting>()

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const {
        offsetWidth,
        offsetHeight,
        offsetLeft,
        offsetTop,
        clientLeft,
      } = chartRef.current
      setwrapperSettings({
        width: offsetWidth,
        height: offsetHeight,
        borderWidth: clientLeft,
        top: offsetTop,
        left: offsetLeft,
      })
    }
  }, [])

  const updatePoint = (data: PointModel, newData: PointModel) => {
    const tempPoints = points.map((point) => {
      if (point === data) {
        return newData
      }
      return point
    })
    setPoints(tempPoints)
  }

  return (
    <div className="chart" ref={chartRef}>
      <span className="y-label">Completeness of Vision</span>
      <span className="x-label">Ability to Execute</span>

      <label className="lbl lbl-top-left">Challengers</label>
      <label className="lbl lbl-top-right">Leaders</label>
      <label className="lbl lbl-bottom-left">Niche Players</label>
      <label className="lbl lbl-bottom-right">Visionaries</label>

      {wrapperSettings &&
        points.map((point, index) => (
          <Point
            key={index}
            point={point}
            chartSettings={wrapperSettings}
            pointUpdated={updatePoint}
          ></Point>
        ))}
    </div>
  )
}

export default Chart

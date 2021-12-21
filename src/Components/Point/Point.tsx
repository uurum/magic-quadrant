import { DragEvent, useEffect, useRef, useState } from 'react'
import { PointModel } from '../../Models/types'

import './Point.css'

interface IProps {
  point: PointModel
  chartSettings?: ChartSetting
  pointUpdated: (data: PointModel, newData: PointModel) => void
}

interface Position {
  top: number
  left: number
}

export interface ChartSetting {
  width: number
  height: number
  borderWidth: number
  left: number
  top: number
}

const Point: React.FC<IProps> = ({ point, chartSettings, pointUpdated }) => {
  const [startPosition, setStartPosition] = useState<Position>({
    top: 0,
    left: 0,
  })
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let maxW = 386, maxY = 386;
    if (chartSettings) {
      maxW = chartSettings?.width - chartSettings?.borderWidth * 2
      maxY = chartSettings?.height - chartSettings?.borderWidth * 2
    }

    if (ref.current) {
      ref.current.style.left = point.ability * ((maxW - ref.current.offsetWidth) / 100) + 'px'
      ref.current.style.bottom = point.vision * ((maxY - ref.current.offsetWidth) / 100)  + 'px'
    }
  }, [point])

  const dragEnd = (e: DragEvent) => {
    if (ref.current) {
      const currentX = +ref.current.style.left.replace('px', '')
      const currentY = +ref.current.style.bottom.replace('px', '')
      let newX = currentX + e.screenX - startPosition.left
      let newY = currentY - e.screenY + startPosition.top
      newX = newX < 0 ? 0 : newX
      newY = newY < 0 ? 0 : newY
      let maxW = 386,
        maxY = 386

      if (chartSettings) {
        maxW =
          chartSettings?.width -
          chartSettings?.borderWidth * 2 -
          ref.current.offsetWidth
        maxY =
          chartSettings?.height -
          chartSettings?.borderWidth * 2 -
          ref.current.offsetHeight
      }

      newX = newX > maxW ? maxW : newX
      newY = newY > maxY ? maxY : newY

      ref.current.style.left = newX + 'px'
      ref.current.style.bottom = newY + 'px'
      updatePoint(newX, newY, maxW, maxY)
      if (ref.current) {
        ref.current.classList.remove('active')
      }
    }
  }

  const updatePoint = (
    ability: number,
    vision: number,
    maxW: number,
    maxY: number,
  ) => {
    const p: PointModel = {
      ability: Math.round(ability / (maxW / 100)),
      vision: Math.round(vision / (maxY / 100)),
      label: point.label,
    }

    pointUpdated(point, p)
  }

  const dragStart = (e: DragEvent) => {
    setStartPosition({ left: e.screenX, top: e.screenY })
    if (ref.current) {
      ref.current.classList.add('active')
    }
  }

  return (
    <span
      ref={ref}
      draggable
      onDragEnd={dragEnd}
      onDragStart={dragStart}
      className="point"
    >
      {point.label}
    </span>
  )
}

export default Point

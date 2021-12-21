import React, { useContext, useState } from 'react'
import PointContext from '../../Context/PointContext'
import { PointModel } from '../../Models/types'
import AddPoint from '../AddPoint/AddPoint'
import './Table.css'

const Table = () => {

  const { points, setPoints } = useContext(PointContext);

  const [visionError, setVisionError] = useState('')
  const [abilityError, setAbilityError] = useState('')

  const deletePoint = (point: PointModel) => {
    const tempPoints = points.filter((item) => item !== point)
    setPoints(tempPoints)
  }

  const addPoint = (point: PointModel) => {
    setPoints([...points, point])
  }

  const validatePoint = (value: number): string => {
    if (value < 0) {
      return 'Must > 0'
    }

    if (value > 100) {
      return 'Must <= 100'
    }

    return ''
  }

  const updateVision = (value: string, point: PointModel) => {
    const validate = validatePoint(+value)
    setVisionError(validate)

    if (validate !== '') {
      return
    }
    setPoints(
      points.map((p) => {
        if (p === point) {
          return { ...point, vision: +value }
        }
        return p
      }),
    )
  }

  const updateAbility = (value: string, point: PointModel) => {
    const validate = validatePoint(+value)
    setAbilityError(validate)

    if (validate !== '') {
      return
    }

    setPoints(
      points.map((p) => {
        if (p === point) {
          return { ...point, ability: +value }
        }
        return p
      }),
    )
  }

  const updateLabel = (value: string, point: PointModel) => {
    setPoints(
      points.map((p) => {
        if (p === point) {
          return { ...point, label: value }
        }
        return p
      }),
    )
  }

  return (
    <div className="tbl">
      <div className="tbl-row tbl-header">
        <div>Label</div>
        <div>Vision</div>
        <div>Ability</div>
        <div>Delete</div>
      </div>
      {points.map((point, index) => (
        <div className="tbl-row" key={index}>
          <div>
            <input
              type="text"
              value={point.label}
              onChange={(e) => updateLabel(e.target.value, point)}
            />
          </div>
          <div>
            <input
              type="number"
              value={point.vision}
              onChange={(e) => updateVision(e.target.value, point)}
            />
            <span className="err" hidden={visionError === ''}>
              {visionError}
            </span>
          </div>
          <div>
            <input
              type="number"
              value={point.ability}
              onChange={(e) => updateAbility(e.target.value, point)}
            />
            <span className="err" hidden={abilityError === ''}>
              {abilityError}
            </span>
          </div>
          <div>
            <button onClick={() => deletePoint(point)}>Delete</button>
          </div>
        </div>
      ))}
      <AddPoint addPoint={addPoint} />
    </div>
  )
}

export default Table

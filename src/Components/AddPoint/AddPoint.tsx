import React from 'react'
import './AddPoint.css'
import { useForm } from 'react-hook-form'
import { PointModel } from '../../Models/types'

interface Props {
  addPoint: (point: PointModel) => void
}

const AddPoint: React.FC<Props> = ({ addPoint }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: PointModel) => {
    addPoint(data)
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tbl-row">
        <div className='form-input'>
          <input
            type="text"
            placeholder="Label"
            {...register('label', { required: true })}
          />
          {errors.label && <span className="err">Required!</span>}
        </div>
        <div className='form-input'>
          <input
            type="number"
            placeholder="Vision"
            {...register('y', { required: true, min: 0, max: 99 })}
          />
          {errors.y && errors.y.type === 'required' && <span>Required!</span>}
          {errors.y && errors.y.type === 'min' && <span>Min 0</span>}
          {errors.y && errors.y.type === 'max' && <span>Max 100</span>}
        </div>
        <div className='form-input'>
          <input
            type="number"
            placeholder="Ability"
            {...register('x', { required: true, min: 0, max: 99 })}
          />
          {errors.x && errors.x.type === 'required' && <span>Required!</span>}
          {errors.x && errors.x.type === 'min' && <span>Min 0</span>}
          {errors.x && errors.x.type === 'max' && <span>Max 100</span>}
        </div>
        <div>
          <input type="submit" value="Add" />{' '}
        </div>
      </div>
    </form>
  )
}

export default AddPoint

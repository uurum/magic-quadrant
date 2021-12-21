import { render, screen } from '@testing-library/react'
import PointContext from '../../Context/PointContext'
import Chart from './Chart'

test('User can see error messages and user can insert Point', async () => {
  const points = [{ label: 'Jack', ability: 25, vision: 50 }]
  render(
    <PointContext.Provider value={{ points, setPoints: (data) => {} }}>
      <Chart />,
    </PointContext.Provider>,
  )
  const pointElement = screen.getAllByText('Jack')
  expect(pointElement[0]).toBeInTheDocument()
})

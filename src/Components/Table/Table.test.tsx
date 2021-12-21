import { render, screen } from '@testing-library/react'
import PointContext from '../../Context/PointContext';
import Table from './Table'

test('Props should be listed', () => {
  const points = [{ label: 'Jack', ability: 25, vision: 50 }];
  render(
    <PointContext.Provider value={{points, setPoints: (data) => {} }}>
      <Table />,
    </PointContext.Provider>
  )

  const labelInput = screen.getByDisplayValue('Jack')
  expect(labelInput).toBeInTheDocument()
})

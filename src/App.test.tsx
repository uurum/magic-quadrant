import { render, screen } from '@testing-library/react'
import App from './App'

test('User can insert Point', async () => {
  render(<App />)
  const header = screen.getByText(/Magic Quadrant/i)
  expect(header).toBeInTheDocument()
})

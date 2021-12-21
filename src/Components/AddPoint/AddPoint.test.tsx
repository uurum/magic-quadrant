import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import AddPoint from './AddPoint'
import userEvent from '@testing-library/user-event'

test('Ability and vision must be number', async () => {
  render(<AddPoint addPoint={() => {}} />)

  const ability: HTMLInputElement = screen.getByPlaceholderText('Ability')
  await fireEvent.change(ability, {
    target: { value: '234sdfgsd' },
  })
  const vision: HTMLInputElement = screen.getByPlaceholderText('Vision')
  await fireEvent.change(vision, {
    target: { value: '123dfgdsg' },
  })

  expect(ability.value).toEqual('')
  expect(ability.value).toEqual('')
})

import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {Button} from '@/app/components/Button'

describe('Home', () => {
  it('renders a heading', () => {
    render(<h1 role="heading">Hello World</h1>)
    expect(screen.getByRole('heading')).toHaveTextContent('Hello World')
  })

  it('render home page', () => {
    render(<Button data-testid="button" />)
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })
})

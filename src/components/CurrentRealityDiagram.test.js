import { render, screen } from '@testing-library/react'
import React from 'react'

import CurrentRealityDiagram from './CurrentRealityDiagram'

describe('Current Reality Diagram', () => {
  it.skip('renders the container with title', () => {
    render(<CurrentRealityDiagram />)
    expect(screen.getByText('Current Reality Diagram')).toBeInTheDocument()
    // expect(screen.getByTestId('diagram')).toBeInTheDocument()
  })
})

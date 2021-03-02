import Paper from '@material-ui/core/Paper'
import React from 'react'

import Diagram from './CurrrentRealityDiagram/Diagram'
import Title from './Title'

export default function CurrentRealityDiagram() {
  return (
    <Paper>
      <Title>Current Reality Diagram</Title>
      <Diagram data-testid="diagram" />
    </Paper>
  )
}

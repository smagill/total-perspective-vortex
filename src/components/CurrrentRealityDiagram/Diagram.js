import CytoscapeComponent from 'react-cytoscapejs'
import React from 'react'

const Diagram = () => {
  const elements = CytoscapeComponent.normalizeElements({
    nodes: [
      { data: { id: 'one', label: 'Node 1' }, position: { x: 100, y: 50 } },
      { data: { id: 'two', label: 'Node 2' }, position: { x: 200, y: 100 } },
    ],
    edges: [
      {
        data: {
          source: 'one',
          target: 'two',
          label: 'Edge from Node1 to Node2',
        },
      },
    ],
  })

  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: '600px', height: '400px' }}
      layout={{ name: 'random' }}
    />
  )
}

export default Diagram

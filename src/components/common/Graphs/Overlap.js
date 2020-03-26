import React from 'react'
import { OverlappedComboChart } from '@opd/g2plot-react'
import _ from 'lodash'

const SmoothLine = ({ data }) => {
  // _.pullAllWith(data,

  const config = {
    layers: [
      {
        type: 'groupedColumn',
        name: 'Uv',
        data: data || [],
        xField: 'date',
        yField: 'value',
        groupField: 'type',
      },
      {
        type: 'line',
        name: 'line',
        data: data || [],
        xField: 'date',
        yField: 'value',
        color: '#f8ca45',
        lineSize: 2,
      },
    ],
  }
  return <OverlappedComboChart {...config} />
}

export default SmoothLine

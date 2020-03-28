/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tabs } from 'antd'
import { LineChart, GroupedColumnChart, AreaChart } from '@opd/g2plot-react'

import { StickyContainer, Sticky } from 'react-sticky'

const { TabPane } = Tabs

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className='site-custom-tab-bar'
        style={{ ...style }}
      />
    )}
  </Sticky>
)

const CountriesGraphs = ({ data, searchedCountry }) => {
  const transformCountryHistoryData = _.map(data, item => {
    const newItem = _.clone(item)
    newItem.country = newItem.country.toLowerCase()
    return newItem
  })

  const filteredData = () => {
    let dataFiltered = []
    if (searchedCountry === '' || searchedCountry == null) {
      dataFiltered = transformCountryHistoryData
    } else {
      dataFiltered = _.filter(transformCountryHistoryData, {
        country: searchedCountry.toLowerCase(),
      })
    }
    return dataFiltered
  }

  const lineChatConfig = {
    description: {
      visible: true,
      text: 'Click data fields from below to filter data',
    },
    padding: 'auto',
    forceFit: true,
    data: filteredData() || [],
    xField: 'country',
    yField: 'value',
    yAxis: {
      label: {
        formatter: v => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
      },
    },
    xAxis: {
      tickCount: 20,
    },
    seriesField: 'type',
    responsive: true,
    connectedArea: {
      visible: true,
      triggerOn: 'mouseenter',
    },
  }

  const barConfig = {
    forceFit: true,
    description: {
      visible: true,
      text: 'Click data fields from below to filter data',
    },
    padding: 'auto',
    data: filteredData() || [],
    xField: 'country',
    yField: 'value',
    stackField: 'type',
    connectedArea: {
      visible: true,
      triggerOn: 'mouseenter',
    },
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0.0,
          end: 0.1,
        },
      },
    ],
  }

  const areaConfig = {
    description: {
      visible: true,
      text: 'Click data fields from below to filter data',
    },
    data: filteredData() || [],
    xField: 'country',
    yField: 'value',
    stackField: 'type',
    responsive: true,
    connectedArea: {
      visible: true,
      triggerOn: 'mouseenter',
    },
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0.0,
          end: 0.1,
        },
      },
    ],
  }

  return (
    <>
      <StickyContainer>
        <Tabs defaultActiveKey='1' renderTabBar={renderTabBar}>
          <TabPane tab='Line Chart' key='1'>
            <section>
              <LineChart {...lineChatConfig} />
            </section>
          </TabPane>
          <TabPane tab='Bar Chart' key='2'>
            <section>
              <GroupedColumnChart {...barConfig} />
            </section>
          </TabPane>
          <TabPane tab='Area Chart' key='3'>
            <section>
              <AreaChart {...areaConfig} />
            </section>
          </TabPane>
        </Tabs>
      </StickyContainer>
    </>
  )
}

CountriesGraphs.propTypes = {
  data: PropTypes.array.isRequired,
  searchedCountry: PropTypes.string.isRequired,
}

export default CountriesGraphs

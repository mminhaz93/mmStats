import React, { useState } from 'react'
import { Tabs, Switch } from 'antd'
import { LineChart, GroupedColumnChart } from '@opd/g2plot-react'
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

const Graphs = ({ data }) => {
  const [theme, setTheme] = useState('light')

  const lineChatConfig = {
    description: {
      visible: true,
      text:
        'Enable/Disable data fields from below to see individual breakdown of COVID-19',
    },
    padding: 'auto',
    forceFit: true,
    data: data || [],
    xField: 'date',
    yField: 'value',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: v => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
      },
    },
    xAxis: {
      type: 'time',
      tickCount: 40,
    },
    seriesField: 'type',
    responsive: true,
    connectedArea: {
      visible: true,
      triggerOn: 'mouseenter',
    },
    theme: 'light',
  }

  const barConfig = {
    forceFit: true,
    description: {
      visible: true,
      text:
        'Enable/Disable data fields from below to see individual breakdown of COVID-19',
    },
    padding: 'auto',
    data: data || [],
    xField: 'date',
    yField: 'value',
    stackField: 'type',
    yAxis: {
      min: 0,
    },
    connectedArea: {
      visible: true,
      triggerOn: 'mouseenter',
    },
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0.0,
          end: 0.8,
        },
      },
    ],
    theme: 'light',
  }

  function onChange(checked) {
    checked ? setTheme('dark') : setTheme('light')
  }

  return (
    <>
      {/* <button onClick={() => setTheme('dark')}>Click me</button> */}
      {/* <Switch onChange={onChange} />
      <p>
        Current theme is : {theme}, {barConfig.theme}
      </p> */}
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
          {/* <TabPane tab='Overlap' key='3'>
          <section>

          </section>
        </TabPane> */}
        </Tabs>
      </StickyContainer>
    </>
  )
}

export default Graphs

import React from 'react'
import { Tabs } from 'antd'
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
  const lineChatConfig = {
    title: {
      visible: true,
      text: 'COVID-19',
    },
    padding: 'auto',
    forceFit: true,
    data: data || [],
    xField: 'date',
    yField: 'value',
    yAxis: {
      label: {
        formatter: v => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
      },
    },
    // legend: {
    //   position: 'right-top',
    // },
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
    label: {
      visible: false,
      position: 'middle',
    },
    connectedArea: {
      visible: true,
      triggerOn: 'mouseenter',
    },
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0.1,
          end: 0.8,
        },
      },
    ],
  }

  return (
    <StickyContainer>
      <Tabs defaultActiveKey='1' renderTabBar={renderTabBar}>
        <TabPane tab='Line Chart' key='1' style={{ height: 400 }}>
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
  )
}

export default Graphs

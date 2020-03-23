import React, { useState } from 'react'
import { Layout } from 'antd'
import Sider from './Sider'

// Component
import Convid from '../Convid/index'

const { Content } = Layout
const LandingLayout = () => {
  const components = {
    1: <Convid />,
    2: <div>Option 2</div>,
    3: <div>Option 3</div>,
    4: <div>Option 4</div>,
  }

  const [render, updateRender] = useState(1)

  const handleMenuClick = menu => {
    updateRender(menu.key)
  }

  return (
    <div className='App'>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider handleClick={handleMenuClick} />
        <Content
          style={{
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          {components[render]}
        </Content>
      </Layout>
    </div>
  )
}
export default LandingLayout

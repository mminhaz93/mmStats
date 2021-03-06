import React, { Component } from 'react'
import { Layout, Menu, Typography } from 'antd'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as LogoIcon } from '@static/logo.svg'

import { MdHealing } from 'react-icons/md'

class Sider extends Component {
  state = {
    collapsed: true,
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  toggle = () => {
    const { collapsed } = this.state
    this.setState({
      collapsed: !collapsed,
    })
  }

  render() {
    const { collapsed } = this.state
    const { handleClick } = this.props

    return (
      <Layout.Sider
        collapsible
        collapsedWidth='0'
        breakpoint='lg'
        collapsed={collapsed}
        onCollapse={this.onCollapse}
      >
        <div className='h-20 m-2 flex items-center justify-center'>
          <LogoIcon className='h-10 w-10 fill-primary-color' />
          <Typography.Title
            level={2}
            className={classNames('text-primary-color ml-2 mt-4', {
              hidden: collapsed,
            })}
          >
            MmStats
          </Typography.Title>
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1' onClick={handleClick}>
            <MdHealing className='anticon' />
            <span>COVID-19</span>
          </Menu.Item>
          {/*        <Menu.Item key='2' onClick={handleClick}>
            <Icon type='video-camera' />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key='3' onClick={handleClick}>
            <Icon type='upload' />
            <span>nav 3</span>
          </Menu.Item> */}
        </Menu>
      </Layout.Sider>
    )
  }
}
Sider.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default Sider

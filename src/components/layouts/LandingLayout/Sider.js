import React, { Component } from 'react'
import { Layout, Menu, Icon, Typography } from 'antd'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as LogoIcon } from '@static/logo.svg'

import { MdHealing } from 'react-icons/md'

class Sider extends Component {
  state = {
    collapsed: false,
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
        collapsed={collapsed}
        onCollapse={this.onCollapse}
      >
        <div className='h-20 m-2 flex items-center justify-around'>
          <LogoIcon className='h-10 w-10 mr-2 fill-primary-color' />
          <Typography.Title
            level={4}
            className={classNames('text-primary-color', {
              hidden: collapsed,
            })}
          >
            MoStats
          </Typography.Title>
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1' onClick={handleClick}>
            <MdHealing className='anticon' />
            <span>Convid-19</span>
          </Menu.Item>
          <Menu.Item key='2' onClick={handleClick}>
            <Icon type='video-camera' />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key='3' onClick={handleClick}>
            <Icon type='upload' />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    )
  }
}
Sider.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default Sider

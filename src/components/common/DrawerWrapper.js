import React from 'react'
import PropTypes from 'prop-types'
import { Drawer } from 'antd'

const DrawerWrapper = ({ title, onClose, visible, children }) => {
  return (
    <Drawer
      title={title}
      placement='right'
      onClose={onClose}
      visible={visible}
      width={650}
    >
      {children}
    </Drawer>
  )
}

DrawerWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
}

export default DrawerWrapper

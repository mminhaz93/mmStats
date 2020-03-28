/* eslint-disable react/forbid-prop-types */
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
      width={500}
    >
      {children}
    </Drawer>
  )
}

DrawerWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
}

export default DrawerWrapper

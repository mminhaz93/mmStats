import React from 'react'
import { Typography } from 'antd'
import LandingLayout from '@layouts/LandingLayout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleDarkMode } from '../action/darkModeAction'

// eslint-disable-next-line no-shadow
const IndexPage = ({ isDarkMode, toggleDarkMode }) => (
  <LandingLayout>
    <div className='flex flex-col items-center'>
      <button
        type='button'
        style={isDarkMode ? { background: 'black', color: 'white' } : null}
        onClick={() => toggleDarkMode(!isDarkMode)}
      >
        Dark mode {isDarkMode ? 'on' : 'off'}
      </button>
      <Typography.Title className='text-primary-color'>
        Fast in every way that matters
      </Typography.Title>
      <Typography.Title level={4} className='text-gray-600'>
        Gatsby is a free and open source framework based on React that helps
        developers build blazing fast websites and apps
      </Typography.Title>
      <img src='/cover.png' alt='logo' className='mt-10' />
    </div>
  </LandingLayout>
)

IndexPage.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isDarkMode: state.mode.isDarkMode,
})

export default connect(
  mapStateToProps,
  { toggleDarkMode },
)(IndexPage)

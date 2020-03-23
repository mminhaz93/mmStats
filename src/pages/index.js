import LandingLayout from '@layouts/LandingLayout'
import React from 'react'
import { connect } from 'react-redux'
import { toggleDarkMode } from '../actions/darkModeAction'

// eslint-disable-next-line no-shadow
const IndexPage = () => (
  <div>
    <LandingLayout />
  </div>
)

const mapStateToProps = state => ({
  isDarkMode: state.mode.isDarkMode,
})

export default connect(
  mapStateToProps,
  { toggleDarkMode },
)(IndexPage)

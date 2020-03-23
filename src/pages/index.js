import React from 'react'
import { connect } from 'react-redux'
import { toggleDarkMode } from '../actions/darkModeAction'
import LandingLayout from '../components/layouts/LandingLayout/index'

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

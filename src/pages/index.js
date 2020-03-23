import LandingLayout from '@layouts/LandingLayout'
import React from 'react'
import { connect } from 'react-redux'
import WorldDetails from '../components/layouts/Convid/WorldDetails'
import { toggleDarkMode } from '../actions/darkModeAction'
import CountiresDetails from '../components/layouts/Convid/countries/CountiresDetails'

// eslint-disable-next-line no-shadow
const IndexPage = () => (
  <LandingLayout>
    <WorldDetails />
    <CountiresDetails />
  </LandingLayout>
)

const mapStateToProps = state => ({
  isDarkMode: state.mode.isDarkMode,
})

export default connect(
  mapStateToProps,
  { toggleDarkMode },
)(IndexPage)

import LandingLayout from '@layouts/LandingLayout'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import WorldDetails from '../components/layouts/Convid/WorldDetails'
import { toggleDarkMode } from '../actions/darkModeAction'
import CountryDetails from '../components/layouts/Convid/CountryDetails'
import CountiresDetails from '../components/layouts/Convid/CountiresDetails'

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
    </div>
    {/* <Posts /> */}
    <WorldDetails />
    {/* <CountryDetails /> */}
    <CountiresDetails />
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

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { connect } from 'react-redux'
import { fetchWorldTotalStat } from '../../../actions/covidAction'

class WorldDetails extends Component {
  componentWillMount() {
    // eslint-disable-next-line no-shadow
    const { fetchWorldTotalStat } = this.props
    fetchWorldTotalStat()
  }

  render() {
    const {
      total_cases,
      total_deaths,
      total_recovered,
      new_cases,
      new_deaths,
      statistic_taken_at,
    } = this.props.covid

    return (
      <div>
        <Typography.Title className='text-primary-color'>
          World Details
        </Typography.Title>
        <div>Total cases: {total_cases}</div>
        <div>Total deaths: {total_deaths}</div>
        <div>Total recovered: {total_recovered}</div>
        <div>New Cases: {new_cases}</div>
        <div>New Cases: {new_deaths}</div>
        <p>Date as of {statistic_taken_at}</p>
      </div>
    )
  }
}

WorldDetails.propTypes = {
  fetchWorldTotalStat: PropTypes.func.isRequired,
  covid: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  covid: state.covid.items,
})

export default connect(
  mapStateToProps,
  { fetchWorldTotalStat },
)(WorldDetails)

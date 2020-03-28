/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Typography, Statistic, Row, Col, Alert, Card } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { fetchWorldTotalStat } from '../../../actions/covidAction'
import { convertDate } from '../../../util/helpers'

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
      statistic_taken_at,
    } = this.props.covid

    const worldDateMessage = `Data as of ${convertDate(
      statistic_taken_at,
    )} (GMT)`

    return (
      <div className='covid-world-details'>
        <Typography.Title className='covid-world-details covid-world-details_title text-primary-color'>
          Coronavirus (COVID-19)
        </Typography.Title>
        <Alert message={worldDateMessage} type='info' showIcon />

        <Row>
          <Col xs={12} sm={12} md={6} lg={8} xl={6}>
            <Card>
              <Statistic
                title='New Cases'
                value={new_cases}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={8} xl={6}>
            <Card>
              <Statistic title='Total Cases' value={total_cases} />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={8} xl={6}>
            <Card>
              <Statistic
                title='Total Recovered'
                value={total_recovered}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>

          <Col xs={12} sm={12} md={6} lg={8} xl={6}>
            <Card>
              <Statistic
                title='Total Death'
                value={total_deaths}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

WorldDetails.propTypes = {
  fetchWorldTotalStat: PropTypes.func.isRequired,
  covid: PropTypes.any.isRequired,
}

const mapStateToProps = state => ({
  covid: state.covid.items,
})

export default connect(
  mapStateToProps,
  { fetchWorldTotalStat },
)(WorldDetails)

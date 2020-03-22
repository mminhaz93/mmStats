/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Typography, Input, Card, Row, Col, Statistic } from 'antd'

import { connect } from 'react-redux'
import { fetchCountryStat } from '../../../actions/covidAction'

class CountryDetails extends Component {
  componentWillMount() {
    // eslint-disable-next-line no-shadow
    const { fetchCountryStat } = this.props
    fetchCountryStat()
  }

  render() {
    const { Search } = Input
    const { latest_stat_by_country } = this.props.covidCountry

    return (
      <div>
        <Typography.Title className='text-primary-color'>
          Country Details
        </Typography.Title>
        <Search
          placeholder='input search text'
          onSearch={value => console.log(value)}
          enterButton
        />

        <div className='site-card-border-less-wrapper'>
          {/* {latest_stat_by_country.map(country => (
            <div>{country.id}</div>
          ))} */}
          <Card bordered={false} style={{ width: 300 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title='Active Users'
                  // value={latest_stat_by_country.id}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title='Account Balance (CNY)'
                  value={112893}
                  precision={2}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    )
  }
}

CountryDetails.propTypes = {
  fetchCountryStat: PropTypes.func.isRequired,
  covidCountry: PropTypes.any.isRequired,
}

const mapStateToProps = state => ({
  covidCountry: state.covid.countryItems,
})

export default connect(
  mapStateToProps,
  { fetchCountryStat },
)(CountryDetails)

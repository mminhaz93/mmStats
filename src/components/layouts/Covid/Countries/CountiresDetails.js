/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Table, Button, Tooltip, Result } from 'antd'
import Highlighter from 'react-highlight-words'
import { connect } from 'react-redux'
import './style.scss'
import { SearchOutlined, EllipsisOutlined } from '@ant-design/icons'
import _ from 'lodash'
import {
  fetchCountriesStat,
  fetchCountryHistory,
} from '../../../../actions/covidAction'
import { fetchedNowDateFormat } from '../../../../util/helpers'
import { drawerColumns } from './TableProperties'
import DrawerWrapper from '../../../common/DrawerWrapper'
import Graphs from '../../../common/Graphs/Graphs'

class CountriesDetails extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
    sortedInfo: null,
    countrySelectedForHistory: '',
    visible: false,
  }

  componentWillMount() {
    // eslint-disable-next-line no-shadow
    const { fetchCountriesStat } = this.props
    fetchCountriesStat()
  }

  // Drawer
  handleDrawer = country => {
    const { fetchCountryHistory } = this.props

    fetchCountryHistory(country)
    this.setState({
      countrySelectedForHistory: country,
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  // Sorting
  // pagination, filters is needed for sort for some reason
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    })
  }

  // Searching for country
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder='Search for a country'
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#009387' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#009387',
            padding: 0,
            color: '#fff',
          }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  })

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  render() {
    const {
      countries,
      countriesError,
      loadingCountries,
      history,
      historyError,
      loadingHistory,
      historyGraph,
    } = this.props

    const countriesDataTransformed = _.map(countries, item => {
      const replaceComma = str => {
        return !_.isNil(str) ? str.replace(/[, ]+/g, '').trim() : str
      }

      const newItem = _.clone(item)
      newItem.cases = replaceComma(newItem.cases) * 1
      newItem.deaths = replaceComma(newItem.deaths) * 1
      newItem.total_recovered = replaceComma(newItem.total_recovered) * 1
      newItem.new_death = replaceComma(newItem.new_death) * 1
      newItem.new_cases = replaceComma(newItem.new_cases) * 1
      newItem.serious_critical = replaceComma(newItem.serious_critical) * 1
      newItem.active_cases = replaceComma(newItem.active_cases) * 1
      newItem.total_cases_per_1m_population =
        replaceComma(newItem.total_cases_per_1m_population) * 1
      return newItem
    })

    const historyDataTransformed = _.map(history, item => {
      const newItem = _.clone(item)
      newItem.record_date = newItem.record_date
      newItem.record_date = fetchedNowDateFormat(newItem.record_date)
      return newItem
    })

    let { sortedInfo } = this.state
    sortedInfo = sortedInfo || {}
    const columns = [
      {
        title: 'Country',
        dataIndex: 'country_name',
        key: 'country_name',
        ...this.getColumnSearchProps('country_name'),
        sorter: (a, b) => `${a.country_name}`.localeCompare(b.country_name),
        sortOrder: sortedInfo.columnKey === 'country_name' && sortedInfo.order,
        width: 150,
      },
      {
        title: 'Total Cases',
        dataIndex: 'cases',
        key: 'cases',
        align: 'center',
        sorter: (a, b) => a.cases - b.cases,
        sortOrder: sortedInfo.columnKey === 'cases' && sortedInfo.order,
      },
      {
        title: 'Total Recovered',
        dataIndex: 'total_recovered',
        key: 'total_recovered',
        align: 'center',
        sorter: (a, b) => a.total_recovered - b.total_recovered,
        sortOrder:
          sortedInfo.columnKey === 'total_recovered' && sortedInfo.order,
      },
      {
        title: 'Deaths',
        dataIndex: 'deaths',
        key: 'deaths',
        align: 'center',
        sorter: (a, b) => a.deaths - b.deaths,
        sortOrder: sortedInfo.columnKey === 'deaths' && sortedInfo.order,
      },
      {
        title: 'Active Cases',
        dataIndex: 'active_cases',
        key: 'active_cases',
        align: 'center',
        sorter: (a, b) => a.active_cases - b.active_cases,
        sortOrder: sortedInfo.columnKey === 'active_cases' && sortedInfo.order,
      },
      {
        title: 'Serious Critical',
        dataIndex: 'serious_critical',
        key: 'serious_critical',
        align: 'center',
        sorter: (a, b) => a.serious_critical - b.serious_critical,
        sortOrder:
          sortedInfo.columnKey === 'serious_critical' && sortedInfo.order,
      },
      {
        title: 'New Cases',
        dataIndex: 'new_cases',
        key: 'new_cases',
        align: 'center',
        sorter: (a, b) => a.new_cases - b.new_cases,
        sortOrder: sortedInfo.columnKey === 'new_cases' && sortedInfo.order,
      },
      {
        title: 'New Deaths',
        dataIndex: 'new_deaths',
        key: 'new_deaths',
        align: 'center',
        sorter: (a, b) => a.new_deaths - b.new_deaths,
        sortOrder: sortedInfo.columnKey === 'new_deaths' && sortedInfo.order,
      },
      {
        title: '',
        key: 'operation',
        fixed: 'right',
        width: 50,
        align: 'right',
        render: record => (
          <Tooltip placement='top' title='View History'>
            <Button
              className='covid-country-history'
              size='small'
              onClick={() => this.handleDrawer(record.country_name)}
            >
              <EllipsisOutlined />
            </Button>
          </Tooltip>
        ),
      },
    ]
    const { countrySelectedForHistory } = this.state
    return (
      <div className='covid-world-table'>
        {!countriesError && (
          <Table
            dataSource={countriesDataTransformed}
            columns={columns}
            loading={loadingCountries}
            onChange={this.handleChange}
          />
        )}
        {countriesError && (
          <Result
            status='warning'
            title='Was not able to fetch data. Please try again later.'
          />
        )}
        <DrawerWrapper
          title={`${countrySelectedForHistory}'s coronavirus history`}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          {!historyError && !loadingHistory && <Graphs data={historyGraph} />}
          {!historyError && (
            <Table
              dataSource={historyDataTransformed}
              columns={drawerColumns}
              size='small'
              loading={loadingHistory}
            />
          )}
          {historyError && (
            <Result
              status='warning'
              title='Was not able to fetch data. Please try again later.'
            />
          )}
        </DrawerWrapper>
      </div>
    )
  }
}

CountriesDetails.propTypes = {
  fetchCountriesStat: PropTypes.func.isRequired,
  fetchCountryHistory: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  loadingCountries: PropTypes.bool.isRequired,
  countriesError: PropTypes.string.isRequired,
  history: PropTypes.array.isRequired,
  historyGraph: PropTypes.array.isRequired,
  loadingHistory: PropTypes.bool.isRequired,
  historyError: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  countries: state.covid.countries,
  loadingCountries: state.covid.loadingCountries,
  countriesError: state.covid.countriesError,
  history: state.covid.countryHistory,
  historyGraph: state.covid.historyGraph,
  loadingHistory: state.covid.loadingHistory,
  historyError: state.covid.historyError,
})

export default connect(
  mapStateToProps,
  { fetchCountriesStat, fetchCountryHistory },
)(CountriesDetails)

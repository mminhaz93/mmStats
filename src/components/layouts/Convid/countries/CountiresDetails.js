/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Table, Button, Tooltip, Drawer } from 'antd'
import Highlighter from 'react-highlight-words'
import { connect } from 'react-redux'
import './style.scss'
import { SearchOutlined, EllipsisOutlined } from '@ant-design/icons'
import _ from 'lodash'
import {
  fetchCountriesStat,
  fetchCountryHistory,
} from '../../../../actions/covidAction'
import { convertDate } from '../../../../util/helpers'

class CountriesDetails extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
    filteredInfo: null,
    sortedInfo: null,
    visible: false,
  }

  componentWillMount() {
    // eslint-disable-next-line no-shadow
    const { fetchCountriesStat } = this.props
    fetchCountriesStat()
  }

  // Drawer
  handleDrawer = country => {
    // console.log("Country", country)
    const { fetchCountryHistory } = this.props
    fetchCountryHistory(country)
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  // Sorting
  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null })
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    })
  }

  setCountrySort = () => {
    this.setState({
      sortedInfo: {
        order: 'ascend',
        columnKey: 'country_name',
      },
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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
    const { countries, history } = this.props

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
      newItem.record_date = convertDate(newItem.record_date, 'LL')
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
        title: 'Recovered',
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
        title: 'Serious Critical',
        dataIndex: 'serious_critical',
        key: 'serious_critical',
        align: 'center',
        sorter: (a, b) => a.serious_critical - b.serious_critical,
        sortOrder:
          sortedInfo.columnKey === 'serious_critical' && sortedInfo.order,
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
        title: '',
        key: 'operation',
        fixed: 'right',
        width: 50,
        align: 'right',
        render: record => (
          <Tooltip placement='top' title='View History'>
            <a onClick={() => this.handleDrawer(record.country_name)}>
              <EllipsisOutlined />
            </a>
          </Tooltip>
        ),
      },
    ]

    const drawerColumns = [
      {
        title: 'Date Record',
        dataIndex: 'record_date',
        key: 'cases',
        align: 'center',
      },
      {
        title: 'Total Cases',
        dataIndex: 'total_cases',
        key: 'cases',
        align: 'center',
      },
      {
        title: 'Recovered',
        dataIndex: 'total_recovered',
        key: 'total_recovered',
        align: 'center',
      },
      {
        title: 'Deaths',
        dataIndex: 'total_deaths',
        key: 'deaths',
        align: 'center',
      },
      {
        title: 'New Cases',
        dataIndex: 'new_cases',
        key: 'new_cases',
        align: 'center',
      },
      {
        title: 'New Deaths',
        dataIndex: 'new_deaths',
        key: 'new_deaths',
        align: 'center',
      },
      {
        title: 'Serious Critical',
        dataIndex: 'serious_critical',
        key: 'serious_critical',
        align: 'center',
      },
      {
        title: 'Active Cases',
        dataIndex: 'active_cases',
        key: 'active_cases',
      },
    ]

    return (
      <div>
        {/* <div className='table-operations'>
          <Button onClick={this.setCountrySort}>Sort countries</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear sorters</Button>
        </div> */}
        <Table
          columns={columns}
          dataSource={countriesDataTransformed || []}
          onChange={this.handleChange}
          // scroll={{ x: 1500, y: 300 }}
        />
        <Drawer
          title=' History'
          placement='right'
          s
          onClose={this.onClose}
          visible={this.state.visible}
          width={650}
        >
          <Table
            dataSource={historyDataTransformed}
            columns={drawerColumns}
            size='small'
          />
        </Drawer>
      </div>
    )
  }
}

CountriesDetails.propTypes = {
  fetchCountriesStat: PropTypes.func.isRequired,
  fetchCountryHistory: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  history: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  countries: state.covid.countries,
  history: state.covid.countryHistory,
})

export default connect(
  mapStateToProps,
  { fetchCountriesStat, fetchCountryHistory },
)(CountriesDetails)

/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Input,
  Table,
  Button,
  Tooltip,
  Result,
  notification,
} from 'antd'
import Highlighter from 'react-highlight-words'
import { connect } from 'react-redux'
import '../style.scss'
import { SearchOutlined, EllipsisOutlined } from '@ant-design/icons'
import {
  fetchCountriesStat,
  fetchCountryHistory,
} from '../../../../actions/covidAction'
import {
  countiresColumns,
  drawerColumns,
  transformCountiresData,
  transformCountryHistoryData,
} from './TableProperties'
import DrawerWrapper from '../../../common/DrawerWrapper'
import Graphs from './History/Graphs'
import CountriesGraphs from './CountriesGraphs'

class CountriesDetails extends Component {
  state = {
    searchedCountry: '',
    searchedColumn: '',
    countrySelectedForHistory: '',
    visible: false,
  }

  componentWillMount() {
    // eslint-disable-next-line no-shadow
    const { fetchCountriesStat } = this.props
    fetchCountriesStat()
  }

  // Notification
  openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description: 'Switch to Bar Chart for a better view',
    })
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
          searchWords={[this.state.searchedCountry]}
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
      searchedCountry: selectedKeys[0],
      searchedColumn: dataIndex,
    })
    this.openNotification()
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchedCountry: '' })
  }

  render() {
    const {
      countries,
      countriesError,
      loadingCountries,
      history,
      historyError,
      loadingHistory,
      historyGraphData,
      countriesGraphData,
    } = this.props

    const getHistoryOfCountry = record => {
      return (
        <Tooltip placement='top' title='View History'>
          <Button
            className='covid-country-history'
            size='small'
            onClick={() => this.handleDrawer(record.country_name)}
          >
            <EllipsisOutlined />
          </Button>
        </Tooltip>
      )
    }
    const columns = [
      {
        title: 'Country',
        dataIndex: 'country_name',
        key: 'country_name',
        ...this.getColumnSearchProps('country_name'),
        sorter: (a, b) => `${a.country_name}`.localeCompare(b.country_name),
        width: 150,
      },
      ...countiresColumns,
      {
        title: 'History',
        key: 'operation',
        fixed: 'right',
        width: 50,
        align: 'right',
        render: getHistoryOfCountry,
      },
    ]
    const { countrySelectedForHistory, searchedCountry } = this.state
    const { Panel } = Collapse

    return (
      <>
        <Collapse className='countires-graph' defaultActiveKey={['1']}>
          <Panel header='Show/hide Graphs' key='1'>
            {!countriesError && !loadingCountries && (
              <CountriesGraphs
                data={countriesGraphData}
                searchedCountry={searchedCountry}
              />
            )}
          </Panel>
        </Collapse>

        <div className='covid-world-table'>
          {!countriesError && (
            <Table
              dataSource={transformCountiresData(countries)}
              columns={columns}
              loading={loadingCountries}
              size='small'
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
            {!historyError && !loadingHistory && (
              <Graphs data={historyGraphData} />
            )}
            {!historyError && (
              <Table
                dataSource={transformCountryHistoryData(history)}
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
      </>
    )
  }
}

CountriesDetails.propTypes = {
  fetchCountriesStat: PropTypes.func.isRequired,
  fetchCountryHistory: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  loadingCountries: PropTypes.bool.isRequired,
  countriesError: PropTypes.string,
  history: PropTypes.array.isRequired,
  historyGraphData: PropTypes.array.isRequired,
  countriesGraphData: PropTypes.array.isRequired,
  loadingHistory: PropTypes.bool.isRequired,
  historyError: PropTypes.string,
}

const mapStateToProps = state => ({
  countries: state.covid.countries,
  loadingCountries: state.covid.loadingCountries,
  countriesError: state.covid.countriesError,
  history: state.covid.countryHistory,
  historyGraphData: state.covid.historyGraphData,
  countriesGraphData: state.covid.countriesGraphData,
  loadingHistory: state.covid.loadingHistory,
  historyError: state.covid.historyError,
})

export default connect(
  mapStateToProps,
  { fetchCountriesStat, fetchCountryHistory },
)(CountriesDetails)

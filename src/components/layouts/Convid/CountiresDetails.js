/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Typography, Input, Row, Col, Statistic, Table, Button } from 'antd'

import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'

import { connect } from 'react-redux'
import { fetchCountriesStat } from '../../../actions/covidAction'

class CountriesDetails extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
    loading: false,
  }

  componentWillMount() {
    // eslint-disable-next-line no-shadow
    const { fetchCountriesStat } = this.props
    fetchCountriesStat()
  }

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
          placeholder={`Search ${dataIndex}`}
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

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }

  render() {
    const { countries_stat } = this.props.countries
    const columns = [
      {
        title: 'Name',
        dataIndex: 'country_name',
        key: 'country_name',
        ...this.getColumnSearchProps('country_name'),
      },
      {
        title: 'Cases',
        dataIndex: 'cases',
        key: 'cases',
        sorter: {
          compare: (a, b) => a.cases - b.cases,
          multiple: 3,
        },
      },
      {
        title: 'Recovered',
        dataIndex: 'total_recovered',
        key: 'total_recovered',
      },
      {
        title: 'Deaths',
        dataIndex: 'deaths',
        key: 'deaths',
      },
      {
        title: 'New Cases',
        dataIndex: 'new_cases',
        key: 'new_cases',
      },
      {
        title: 'Serious Critical',
        dataIndex: 'serious_critical',
        key: 'serious_critical',
      },
      {
        title: 'Active Cases',
        dataIndex: 'active_cases',
        key: 'active_cases',
      },
    ]
    
    return <Table columns={columns} dataSource={countries_stat} />
  }
}

CountriesDetails.propTypes = {
  fetchCountriesStat: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  countries: state.covid.countries,
})

export default connect(
  mapStateToProps,
  { fetchCountriesStat },
)(CountriesDetails)

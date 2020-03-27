import _ from 'lodash'
import { fetchedNowDateFormat } from '../../../../util/helpers'

export const countiresColumns = [
  {
    title: 'Total Cases',
    dataIndex: 'cases',
    key: 'cases',
    align: 'center',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.cases - b.cases,
  },
  {
    title: 'Total Recovered',
    dataIndex: 'total_recovered',
    key: 'total_recovered',
    align: 'center',
    sorter: (a, b) => a.total_recovered - b.total_recovered,
  },
  {
    title: 'Deaths',
    dataIndex: 'deaths',
    key: 'deaths',
    align: 'center',
    sorter: (a, b) => a.deaths - b.deaths,
  },
  {
    title: 'Active Cases',
    dataIndex: 'active_cases',
    key: 'active_cases',
    align: 'center',
    sorter: (a, b) => a.active_cases - b.active_cases,
  },
  {
    title: 'Critical Cases',
    dataIndex: 'serious_critical',
    key: 'serious_critical',
    align: 'center',
    sorter: (a, b) => a.serious_critical - b.serious_critical,
  },
  {
    title: 'New Cases',
    dataIndex: 'new_cases',
    key: 'new_cases',
    align: 'center',
    sorter: (a, b) => a.new_cases - b.new_cases,
  },
  {
    title: 'New Deaths',
    dataIndex: 'new_deaths',
    key: 'new_deaths',
    align: 'center',
    sorter: (a, b) => a.new_deaths - b.new_deaths,
  },
]

export const drawerColumns = [
  {
    title: 'Record Date',
    dataIndex: 'record_date',
    key: 'record_date',
    width: 90,
    defaultSortOrder: 'ascend',
    sorter: (a, b) => {
      const dateA = new Date(a.age).getTime()
      const dateB = new Date(b.age).getTime()
      return dateA > dateB ? 1 : -1
    },
  },
  {
    title: 'Total Cases',
    dataIndex: 'total_cases',
    key: 'cases',
    align: 'center',
  },
  {
    title: 'Total Recovered',
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
    title: 'Active Cases',
    dataIndex: 'active_cases',
    key: 'active_cases',
  },
  {
    title: 'Critical Cases',
    dataIndex: 'serious_critical',
    key: 'serious_critical',
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
]

export const transformCountiresData = countries => {
  return _.map(countries, item => {
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
}

export const transformCountryHistoryData = history => {
  return _.map(history, item => {
    const newItem = _.clone(item)
    newItem.record_date = newItem.record_date
    newItem.record_date = fetchedNowDateFormat(newItem.record_date)
    return newItem
  })
}

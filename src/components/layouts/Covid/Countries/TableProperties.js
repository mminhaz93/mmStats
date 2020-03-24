// eslint-disable-next-line import/prefer-default-export
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
    title: 'Serious Critical',
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

/* export const countryColums = [
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
    sortOrder: sortedInfo.columnKey === 'total_recovered' && sortedInfo.order,
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
    sortOrder: sortedInfo.columnKey === 'serious_critical' && sortedInfo.order,
  },
  {
    title: 'Active Cases',
    dataIndex: 'active_cases',
    key: 'active_cases',
    align: 'center',
    sorter: (a, b) => a.active_cases - b.active_cases,
    sortOrder: sortedInfo.columnKey === 'active_cases' && sortedInfo.order,
  },
]
 */

// eslint-disable-next-line import/prefer-default-export
export const drawerColumns = [
  {
    title: 'Record Date',
    dataIndex: 'record_date',
    key: 'cases',
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

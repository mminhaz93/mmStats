/* eslint-disable no-param-reassign */
import moment from 'moment'

export const fetchedNow = (date) => {
  return moment
    .utc(date)
    .local()
    .fromNow()
}

export const convertDate = (date, format) => {
  if (format === undefined) {
    format = 'LLLL'
  }
  return moment(date).format(format)
}

export const convertHoursToMins = totalMinutes => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return { hours, minutes }
}

export const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

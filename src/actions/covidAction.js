/* eslint-disable camelcase */
import fetch from 'cross-fetch'
import {
  headers,
  worldTotalUrl,
  countryUrl,
  countriesUrl,
  countryHistoryUrl,
} from '../util/config'

import {
  COVID_WORLD_TOTAL_STAT,
  COVID_COUNTRY,
  COVID_COUNTRIES,
  COVID_COUNTRY_HISTORY,
} from './types'

export const fetchWorldTotalStat = () => dispatch => {
  fetch(worldTotalUrl, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: COVID_WORLD_TOTAL_STAT,
        payload: data,
      }),
    )
}

export const fetchCountryHistory = country => dispatch => {
  fetch(`${countryHistoryUrl}${country}`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data => {
      const { stat_by_country } = data
      dispatch({
        type: COVID_COUNTRY_HISTORY,
        payload: stat_by_country,
      })
    })
}

export const fetchCountryStat = () => dispatch => {
  fetch(`${countryUrl}canada`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: COVID_COUNTRY,
        payload: data,
      }),
    )
}

export const fetchCountriesStat = () => dispatch => {
  fetch(countriesUrl, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data => {
      const { countries_stat } = data
      dispatch({
        type: COVID_COUNTRIES,
        payload: countries_stat,
      })
    })
}

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
  FETCH_COUNTRY_HISTORY_BEGIN,
  FETCH_COUNTRY_HISTORY_SUCCESS,
  FETCH_COUNTRY_HISTORY_FAILURE,
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

// https://daveceddia.com/where-fetch-data-redux/
// export function fetchCountryHistory(country) {
//   return dispatch => {
//     dispatch(fetchHistoryBegin())
//     return fetch(`${countryHistoryUrl}${country}`, {
//       method: 'GET',
//       headers,
//     })
//       .then(handleErrors)
//       .then(res => res.json())
//       .then(json => {
//         dispatch(fetchHistorySuccess(json.history))
//         return json.history
//       })
//       .catch(error => dispatch(fetchHistoryFailure(error)))
//   }
// }

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const fetchHistoryBegin = () => ({
  type: FETCH_COUNTRY_HISTORY_BEGIN,
})

export const fetchHistorySuccess = history => ({
  type: FETCH_COUNTRY_HISTORY_SUCCESS,
  payload: { history },
})

export const fetchHistoryFailure = error => ({
  type: FETCH_COUNTRY_HISTORY_FAILURE,
  payload: { error },
})

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

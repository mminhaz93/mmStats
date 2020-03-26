/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import fetch from 'cross-fetch'
import _ from 'lodash'
import { convertDate } from '../util/helpers'
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
  FETCH_COVID_COUNTRIES_BEGIN,
  FETCH_COVID_COUNTRIES_SUCCESS,
  FETCH_COVID_COUNTRIES_FAILURE,
  FETCH_COVID_COUNTRY_HISTORY_BEGIN,
  FETCH_COVID_COUNTRY_HISTORY_SUCCESS,
  FETCH_COVID_COUNTRY_HISTORY_FAILURE,
  TRANSFORM_COUNTRY_HISTORY_DATA,
} from './types'

// loadingCountries,
// countriesError,

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

// Handle HTTP errors since fetch won't.
function handleHistoryErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const fetchHistoryBegin = () => ({
  type: FETCH_COVID_COUNTRY_HISTORY_BEGIN,
})

export const fetchHistorySuccess = history => ({
  type: FETCH_COVID_COUNTRY_HISTORY_SUCCESS,
  payload: { history },
})

export const convertHistoryForGraph = graphData => ({
  type: TRANSFORM_COUNTRY_HISTORY_DATA,
  payload: { graphData },
})

export const fetchHistoryFailure = error => ({
  type: FETCH_COVID_COUNTRY_HISTORY_FAILURE,
  payload: { error },
})

// https://daveceddia.com/where-fetch-data-redux/
export function fetchCountryHistory(country) {
  return dispatch => {
    dispatch(fetchHistoryBegin())
    return fetch(`${countryHistoryUrl}${country}`, {
      method: 'GET',
      headers,
    })
      .then(handleHistoryErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchHistorySuccess(json.stat_by_country))
        dispatch(
          convertHistoryForGraph(
            transformHistoryForGraph(json.stat_by_country),
          ),
        )
        return json.stat_by_country
      })
      .catch(error => dispatch(fetchHistoryFailure(error)))
  }
}

const transformHistoryForGraph = json => {
  const returnNum = str => {
    return !_.isNil(str) ? str.replace(/[, ]+/g, '').trim() : str
  }
  const allData = []
  _.map(json, obj => {
    // const transformData = [
    const a = {
      date: convertDate(obj.record_date, 'LL'),
      value: returnNum(obj.total_cases) * 1,
      type: 'Total Cases',
    }
    allData.push(a)
    const b = {
      date: convertDate(obj.record_date, 'LL'),
      value: returnNum(obj.total_deaths) * 1,
      type: 'Total Deaths',
    }
    allData.push(b)
    const c = {
      date: convertDate(obj.record_date, 'LL'),
      value: returnNum(obj.new_cases) * 1,
      type: 'New Cases',
    }
    allData.push(c)
    const d = {
      date: convertDate(obj.record_date, 'LL'),
      value: returnNum(obj.active_cases) * 1,
      type: 'Active Cases',
    }
    allData.push(d)
    const e = {
      date: convertDate(obj.record_date, 'LL'),
      value: returnNum(obj.total_deaths) * 1,
      type: 'Total Deaths',
    }
    allData.push(e)
    const f = {
      date: convertDate(obj.record_date, 'LL'),
      value: returnNum(obj.total_recovered) * 1,
      type: 'Total Recovered',
    }
    allData.push(f)
  })
  // console.log(allData)
  return allData
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

export const fetchCountriesBegin = () => ({
  type: FETCH_COVID_COUNTRIES_BEGIN,
})

export const fetchCountriesSuccess = countries => ({
  type: FETCH_COVID_COUNTRIES_SUCCESS,
  payload: { countries },
})

export const fetchCountriesFailure = error => ({
  type: FETCH_COVID_COUNTRIES_FAILURE,
  payload: { error },
})

// https://daveceddia.com/where-fetch-data-redux/
export function fetchCountriesStat() {
  return dispatch => {
    dispatch(fetchCountriesBegin())
    return fetch(countriesUrl, {
      method: 'GET',
      headers,
    })
      .then(handleHistoryErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCountriesSuccess(json.countries_stat))
        return json.countries_stat
      })
      .catch(error => dispatch(fetchCountriesFailure(error)))
  }
}
